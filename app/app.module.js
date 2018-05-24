"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var time_ago_pipe_1 = require("time-ago-pipe");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var firebase = require("nativescript-plugin-firebase");
var echo_list_service_1 = require("./services/echo-list.service");
var user_service_1 = require("./services/user.service");
var geolocation_service_1 = require("./services/geolocation.service");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var header_component_1 = require("./pages/header/header.component");
var common_1 = require("nativescript-angular/common");
var create_component_1 = require("./pages/create/create.component");
firebase
    .init({
    persist: true,
    storageBucket: 'gs://echoprojet.appspot.com'
})
    .then(function () { return console.log('Firebase initialised!'); })
    .catch(function () { return console.error('Error firebase init'); });
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                http_1.NativeScriptHttpModule,
                router_1.NativeScriptRouterModule,
                router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes),
                angular_1.NativeScriptUISideDrawerModule,
                common_1.NativeScriptCommonModule
            ],
            declarations: [
                app_component_1.AppComponent
            ].concat(app_routing_1.navigatableComponents, [
                time_ago_pipe_1.TimeAgoPipe,
                header_component_1.HeaderComponent,
                create_component_1.CreateComponent
            ]),
            bootstrap: [app_component_1.AppComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [echo_list_service_1.EchoListService, user_service_1.UserService, geolocation_service_1.GeolocationService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsb0RBQXFFO0FBQ3JFLGtEQUFtRTtBQUNuRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLCtDQUE0QztBQUU1QyxpREFBK0M7QUFDL0MsNkNBQThEO0FBRTlELHVEQUEwRDtBQUMxRCxrRUFBK0Q7QUFDL0Qsd0RBQXNEO0FBQ3RELHNFQUFtRTtBQUNuRSw4REFBbUY7QUFDbkYsb0VBQWtFO0FBQ2xFLHNEQUF1RTtBQUN2RSxvRUFBa0U7QUFFbEUsUUFBUTtLQUNMLElBQUksQ0FBQztJQUNKLE9BQU8sRUFBRSxJQUFJO0lBQ2IsYUFBYSxFQUFFLDZCQUE2QjtDQUM3QyxDQUFDO0tBQ0QsSUFBSSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLEVBQXBDLENBQW9DLENBQUM7S0FDaEQsS0FBSyxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEVBQXBDLENBQW9DLENBQUMsQ0FBQztBQXVCckQ7SUFBQTtJQUF5QixDQUFDO0lBQWIsU0FBUztRQXJCckIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2Qiw2QkFBc0I7Z0JBQ3RCLGlDQUF3QjtnQkFDeEIsaUNBQXdCLENBQUMsT0FBTyxDQUFDLG9CQUFNLENBQUM7Z0JBQ3hDLHdDQUE4QjtnQkFDOUIsaUNBQXdCO2FBQ3pCO1lBQ0QsWUFBWTtnQkFDViw0QkFBWTtxQkFDVCxtQ0FBcUI7Z0JBQ3hCLDJCQUFXO2dCQUNYLGtDQUFlO2dCQUNmLGtDQUFlO2NBQ2hCO1lBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUN6QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztZQUMzQixTQUFTLEVBQUUsQ0FBQyxtQ0FBZSxFQUFFLDBCQUFXLEVBQUUsd0NBQWtCLENBQUM7U0FDOUQsQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBUaW1lQWdvUGlwZSB9IGZyb20gJ3RpbWUtYWdvLXBpcGUnO1xuXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyByb3V0ZXMsIG5hdmlnYXRhYmxlQ29tcG9uZW50cyB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5cbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UnKTtcbmltcG9ydCB7IEVjaG9MaXN0U2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2VjaG8tbGlzdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZVwiXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyJ1xuaW1wb3J0IHsgSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlcy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlcy9jcmVhdGUvY3JlYXRlLmNvbXBvbmVudCc7XG5cbmZpcmViYXNlXG4gIC5pbml0KHtcbiAgICBwZXJzaXN0OiB0cnVlLFxuICAgIHN0b3JhZ2VCdWNrZXQ6ICdnczovL2VjaG9wcm9qZXQuYXBwc3BvdC5jb20nXG4gIH0pXG4gIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdGaXJlYmFzZSBpbml0aWFsaXNlZCEnKSlcbiAgLmNhdGNoKCgpID0+IGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZpcmViYXNlIGluaXQnKSk7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKSxcbiAgICBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcENvbXBvbmVudCxcbiAgICAuLi5uYXZpZ2F0YWJsZUNvbXBvbmVudHMsXG4gICAgVGltZUFnb1BpcGUsXG4gICAgSGVhZGVyQ29tcG9uZW50LFxuICAgIENyZWF0ZUNvbXBvbmVudFxuICBdLFxuICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXG4gIHByb3ZpZGVyczogW0VjaG9MaXN0U2VydmljZSwgVXNlclNlcnZpY2UsIEdlb2xvY2F0aW9uU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19