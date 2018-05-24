import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Echo } from "../models/echo";
import firebaseWebApi = require('nativescript-plugin-firebase/app');
import { Subject } from 'rxjs/Subject';
import { GeolocationService } from './geolocation.service';
import * as geoLocation from "nativescript-geolocation";
import { Location } from "nativescript-geolocation";
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class EchoListService implements OnInit {

  echos: Echo[] = [];
  echosPortee : any = [];
  echosSubject = new Subject<Echo[]>();
  echosPorteeSubject = new Subject<Echo[]>();

  portee: number = 10000; // 10 kilomètres de portée

  constructor(private geolocationService: GeolocationService) {}

  ngOnInit() {
    this.geolocationService.updateLocation();
    firebaseWebApi.database().ref('/msg');
  }

  emitEchos() {
    this.echosSubject.next(this.echos);
  }

  emitEchosPortee() {
    this.echosPorteeSubject.next(this.echosPortee);
  }
  saveEchos() {
    firebaseWebApi.database().ref('/msg').set(this.echos);
  }

  removeExpiratedEcho(id) {
    if (firebaseWebApi.database().ref('/msg/' + id)) {
      var msgRef = firebaseWebApi.database().ref('/msg/' + id);
    msgRef.remove()
      .then(() => { console.log('Remove succeeded');
      })
      .catch((error) => { console.log('Remove failed : ' + error);
      });
    }
  }

  getEchos() {
    return new Promise(
      (resolve, reject) => {
        if (firebaseWebApi.database().ref('/msg')) {
          firebaseWebApi.database().ref('/msg')
            .on('value', (data) => {
              this.echosPortee = [];
              if (data.val()) {
                console.log('______________________');
                data.val().forEach(element => {
                  if (element) { // database non vide
                    // location de l'écho lorsqu'il a été émis
                    let msgLocation: Location = new Location();
                    msgLocation.latitude = element.latitude;
                    msgLocation.longitude = element.longitude;
                    this.geolocationService.getDeviceLocation().then(result => {
                      // location actuelle de l'utilisateur
                      let userLocation: Location = new Location();
                      userLocation.latitude = result.latitude;
                      userLocation.longitude = result.longitude;
                      // distance (Castel - Palo Alto : 9433120 mètres)
                      let distance = geoLocation.distance(msgLocation, userLocation);
                      console.log('distance : ' + element.name + ' : ' + distance);
                      if (distance < this.portee) {
                        this.echosPortee.push(element);
                      }
                    }).then(() => {
                      this.emitEchosPortee();
                      resolve(this.echosPortee);
                    });
                  }
               });
              }
              this.echos = data.val() ? data.val() : [];
              this.emitEchos();
            });
          }
      })
    
  }

  createNewEcho(newEcho: Echo) {
    this.echos.unshift(newEcho);
    this.saveEchos();
    this.emitEchos();
    this.emitEchosPortee();
  }

  getEcho(idEcho) {
    return new Promise(
      (resolve, reject) => {
        firebaseWebApi.database().ref('/msg/' + idEcho).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
}

