import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Echo } from "../../models/echo";
import { EchoListService } from "../../services/echo-list.service";
import { UserService } from "../../services/user.service";
import { TextField } from "ui/text-field";
import { Subscription } from 'rxjs/Subscription';
import { Page } from "ui/page";
import { Router } from "@angular/router";
import { GeolocationService } from "../../services/geolocation.service";
import { Location } from 'nativescript-geolocation';
import { Observable } from "data/observable";
import { registerElement } from "nativescript-angular/element-registry";
registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab); //Floating button https://github.com/bradmartin/nativescript-floatingactionbutton
const firebase = require("nativescript-plugin-firebase");


@Component({
  selector: "list",
  moduleId: module.id,
  templateUrl: "./list.html",
  styleUrls: ["./list-common.css", "./list.css"]
})

export class ListComponent implements OnInit, OnDestroy {
  locationSubscription: Subscription;
  currentLocation: Location;

  echoList: Echo[] = [];
  echoListPortee: any = [];

  echoSubscription: Subscription;
  echoPorteeSubscription: Subscription;

  echo = "";
  @ViewChild("echoTextField") echoTextField: ElementRef;
  
  constructor(
    private echoListService: EchoListService,
    private userService: UserService,
    private page: Page,
    private router: Router,
    private geolocationService: GeolocationService) { }

  ngOnInit() {
    this.userService.initUser();
    // en cas d'update de Location
    this.locationSubscription = this.geolocationService.locationSubject.subscribe(
      (location: Location) => {
        this.currentLocation = location;
      }
    );
    this.geolocationService.updateLocation();
    this.geolocationService.emitLocation();

    // en cas d'update de echo dans la portée
    this.echoPorteeSubscription = this.echoListService.echosPorteeSubject.subscribe(
      (echosPortee: Echo[]) => {
        this.echoListPortee = echosPortee;
      });
    // fire la méthode 'next' ie initialise this.echoListPortee ...
    this.echoListService.emitEchosPortee();

    // permet de souscrire au Subject ie. être informé de toute modification
    this.echoSubscription = this.echoListService.echosSubject.subscribe(
      (echos: Echo[]) => {
        this.echoList = echos;
      });
    // fire la méthode 'next' ie initialise this.echoList ...
    this.echoListService.emitEchos();

    // charge les echos
    this.echoListService.getEchos()
    .then((args) => { this.echoListPortee = args;})

    
  }

  onViewEcho(idEcho) {
    this.router.navigate(['/list', 'view', idEcho]);
  }

  onTapAdd() {
    this.router.navigate(['/create']);
  }

  add() {
    this.geolocationService.updateLocation();

    if (this.echo.trim() === "") {
      alert("Entrez un echo");
      return;
    }
  
    // Dismiss the keyboard
    let textField = <TextField>this.echoTextField.nativeElement;
    textField.dismissSoftInput();

    var newEcho = new Echo();
    newEcho.name = this.echo;
    newEcho.date = Date.now();
    newEcho.latitude = this.currentLocation.latitude;
    newEcho.longitude = this.currentLocation.longitude;
    this.echoListService.createNewEcho(newEcho);
  }
  
  refreshList(args) {
    var pullRefresh = args.object;
    setTimeout(function () {
       pullRefresh.refreshing = false;
    }, 1000);
  }

  ngOnDestroy() {
    this.echoSubscription.unsubscribe();
    this.locationSubscription.unsubscribe();
    this.echoPorteeSubscription.unsubscribe();
  }

}
