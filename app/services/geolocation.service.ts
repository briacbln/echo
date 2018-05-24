import { Injectable } from '@angular/core';
import * as geoLocation from "nativescript-geolocation";
import { Location } from "nativescript-geolocation";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GeolocationService {

    location: Location = new Location();
    locationSubject = new Subject<Location>();

    constructor() { }

    emitLocation() {
        this.locationSubject.next(this.location);
    }

    public getDeviceLocation(): Promise<any> {
        return new Promise((resolve, reject) => {
            geoLocation.enableLocationRequest().then(() => {
                geoLocation.getCurrentLocation({
                    desiredAccuracy: 3, //meters
                    maximumAge: 5000,
                    timeout: 50000
                })
                .then(location => {
                    resolve(location);
                })
                .catch(error => {
                    reject(error);
                });
            });
        });
    }

    public updateLocation() {
        this.getDeviceLocation().then(result => {
            this.location.latitude = result.latitude;
            this.location.longitude = result.longitude;
            // data producer
            this.emitLocation();
            //console.log('Location updated');
        }, error => {
            console.log(error);
        });
    }

}
