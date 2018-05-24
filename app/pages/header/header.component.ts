import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";
import * as dialogs from "ui/dialogs";
import { transition } from '@angular/animations';
import { RouterExtensions } from 'nativescript-angular/router';
import { AnimationCurve } from 'ui/enums';
var frameModule = require('ui/frame');

@Component({
	moduleId: module.id,
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, AfterViewInit {
	sidedrawerOn: Boolean = false;
	drawer: RadSideDrawer;
	@ViewChild("sidedrawerId") public drawerComponent: RadSideDrawerComponent;

	activity = application.android.startActivity ||
	application.android.foregroundActivity ||
	frameModule.topmost().android.currentActivity ||
	frameModule.topmost().android.activity;

	constructor(
		private userService: UserService,
		private router: Router,
		private routerExtensions: RouterExtensions,
		private changeDetectorRef: ChangeDetectorRef) { }

	ngOnInit() {
		if (!isAndroid) {
			return;
		} else {
			application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
				if (this.router.isActive('/login', true)) {
					//console.log('0');
				} else if (this.router.isActive('/list', true)) { // page d'accueil
					//console.log('1');
					data.cancel = true;
						dialogs.confirm({
							title: "Confirmation",
							message: "Voulez-vous vraiment quitter Echo ?",
							okButtonText: "Oui",
							cancelButtonText: "Annuler"
						}).then(result => {
							// result argument is boolean
							console.log("Dialog result: " + result);
							if (!result) { // je ne veux pas quitter
								data.cancel = true;
							} else { // je veux quitter
								data.cancel = false;
								this.activity.finish();
							}
						});
				} else if (this.router.isActive('/contacts', true)) {
					data.cancel = true;
					this.routerExtensions.navigate(['/list'], { transition: {
							name: 'slide',
							duration: 1000,
							curve: 'linear'
					}});
					//console.log('3');					
				} else if (this.router.isActive('/profil', true)) {
					data.cancel = true;
					this.routerExtensions.navigate(['/list'], { transition: {
						name: 'flipLeft',
						duration: 1000,
						curve: 'linear'
				}});
					//console.log('4');					
				} else if (this.router.isActive('/about', true)) {
					data.cancel = true;
					this.routerExtensions.navigate(['/list'], { transition: {
						name: 'flip',
						duration: 1000,
						curve: 'linear'
				}});
					//console.log('5');					
				} else if (this.router.isActive('/create', true)) {
					data.cancel = true;
					this.routerExtensions.navigate(['/list'], { transition: {
						name: 'flip',
						duration: 1000,
						curve: 'linear'
				}});
					//console.log('6');					
				} else { //list/view/:id
					data.cancel = true;
					this.routerExtensions.navigate(['/list'], { transition: {
						name: 'fade',
						duration: 1000,
						curve: 'linear'
				}});
					//console.log('2');	
				}
			});
		}
	}

	ngAfterViewInit() {
		this.drawer = this.drawerComponent.sideDrawer;
		this.changeDetectorRef.detectChanges();
	}

	toggleDrawer() {
		if (this.sidedrawerOn) {
		  this.onCloseDrawerTap();
		} else {
		  this.onShowDrawerTap();
		}
	}
	
	  //args: observable.EventData
	  onShowDrawerTap() {
		//console.log("Drawer method reached");
		this.drawer.showDrawer();
		this.sidedrawerOn = !this.sidedrawerOn;
	  }
	
	  onCloseDrawerTap() {
		//console.log("Close reached");
		this.drawer.closeDrawer();
		this.sidedrawerOn = !this.sidedrawerOn;
	  }
	
	  onTapActu() {
		this.router.navigate(['/list']);
		this.onCloseDrawerTap();
	  }
	
	  onTapContacts() {
		this.router.navigate(['/contacts']);
		this.onCloseDrawerTap();
	  }
	
	  onTapProfil() {
		this.router.navigate(['/profil']);
		this.onCloseDrawerTap();
	  }
	
	  onTapAbout() {
		this.router.navigate(['/about']);
		this.onCloseDrawerTap();
	  }
	
	  onTapLogout() {
		dialogs.confirm({
			title: "Déconnection en cours",
			message: "Voulez-vous vraiment vous déconnecter ?",
			okButtonText: "Oui",
			cancelButtonText: "Annuler"
		}).then(result => {
		  // result argument is boolean
		  console.log("Dialog result: " + result);
		  if (result) {
			this.userService.signOutUser();
			this.router.navigate(['/']);
			this.onCloseDrawerTap();
		  }
		});
	  }
}