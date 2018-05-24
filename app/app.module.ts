import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";

import firebase = require('nativescript-plugin-firebase');
import { EchoListService } from "./services/echo-list.service";
import { UserService } from "./services/user.service";
import { GeolocationService } from "./services/geolocation.service"
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'
import { HeaderComponent } from './pages/header/header.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { CreateComponent } from './pages/create/create.component';

firebase
  .init({
    persist: true,
    storageBucket: 'gs://echoprojet.appspot.com'
  })
  .then(() => console.log('Firebase initialised!'))
  .catch(() => console.error('Error firebase init'));

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    NativeScriptUISideDrawerModule,
    NativeScriptCommonModule
  ],
  declarations: [
    AppComponent,
    ...navigatableComponents,
    TimeAgoPipe,
    HeaderComponent,
    CreateComponent
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [EchoListService, UserService, GeolocationService]
})
export class AppModule { }
