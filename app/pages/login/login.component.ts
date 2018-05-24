import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";
import { _resolveAnimationCurve } from "tns-core-modules/ui/animation/animation";
import { AnimationCurve } from "ui/enums";
import { GeolocationService } from '../../services/geolocation.service';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: "my-app",
  providers: [UserService, GeolocationService, ContactsService],
  templateUrl: "./pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})

export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;

  // decorator to create a new property that points at the stacklayout element -> #container local var in template
  @ViewChild("container") container: ElementRef;

  constructor(private router: Router, 
              private userService: UserService, 
              private page: Page,
              private geolocationService: GeolocationService,
              private contactsService: ContactsService
              ) {
    this.user = new User();
    this.user.email = 'test@test.com';
    this.user.password = 'kkkkkk';

  }

  ngOnInit() {  
    this.page.actionBarHidden = true;
    //this.page.backgroundImage = "res://bg_login";
    this.geolocationService.updateLocation();
    this.contactsService.reqPerm();
  }

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    this.userService.signInUser(this.user)
      .then(
        () => {
          this.router.navigate(['/list']);
          this.page.actionBarHidden = false;
        },
        (error) => {
          alert('erreur : ' + error);
        }
      );
  }

  signUp() {
    this.userService.createNewUser(this.user)
      .then(
        () => {
          alert('nouveau compte créé');
          this.toggleDisplay();
        },
        (error) => {
          alert('erreur : ' + error);
        }
      );
  }
  
  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    this.isLoggingIn ? this.page.background = "white" : this.page.background = "salmon";
    let container = <View>this.container.nativeElement;
    container.animate({
      duration: 400,
      translate: this.isLoggingIn ? {x: 0, y: 10} : {x: 0, y: -10},
      curve: AnimationCurve.easeIn
    });
    // blank both fields
    this.user = new User();
  }
  
}
