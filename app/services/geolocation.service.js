"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var geoLocation = require("nativescript-geolocation");
var nativescript_geolocation_1 = require("nativescript-geolocation");
var Subject_1 = require("rxjs/Subject");
var GeolocationService = /** @class */ (function () {
    function GeolocationService() {
        this.location = new nativescript_geolocation_1.Location();
        this.locationSubject = new Subject_1.Subject();
    }
    GeolocationService.prototype.emitLocation = function () {
        this.locationSubject.next(this.location);
    };
    GeolocationService.prototype.getDeviceLocation = function () {
        return new Promise(function (resolve, reject) {
            geoLocation.enableLocationRequest().then(function () {
                geoLocation.getCurrentLocation({
                    desiredAccuracy: 3,
                    maximumAge: 5000,
                    timeout: 50000
                })
                    .then(function (location) {
                    resolve(location);
                })
                    .catch(function (error) {
                    reject(error);
                });
            });
        });
    };
    GeolocationService.prototype.updateLocation = function () {
        var _this = this;
        this.getDeviceLocation().then(function (result) {
            _this.location.latitude = result.latitude;
            _this.location.longitude = result.longitude;
            // data producer
            _this.emitLocation();
            //console.log('Location updated');
        }, function (error) {
            console.log(error);
        });
    };
    GeolocationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], GeolocationService);
    return GeolocationService;
}());
exports.GeolocationService = GeolocationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlb2xvY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0RBQXdEO0FBQ3hELHFFQUFvRDtBQUNwRCx3Q0FBdUM7QUFHdkM7SUFLSTtRQUhBLGFBQVEsR0FBYSxJQUFJLG1DQUFRLEVBQUUsQ0FBQztRQUNwQyxvQkFBZSxHQUFHLElBQUksaUJBQU8sRUFBWSxDQUFDO0lBRTFCLENBQUM7SUFFakIseUNBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0sOENBQWlCLEdBQXhCO1FBQ0ksTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNyQyxXQUFXLENBQUMsa0JBQWtCLENBQUM7b0JBQzNCLGVBQWUsRUFBRSxDQUFDO29CQUNsQixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLEtBQUs7aUJBQ2pCLENBQUM7cUJBQ0QsSUFBSSxDQUFDLFVBQUEsUUFBUTtvQkFDVixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO29CQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDJDQUFjLEdBQXJCO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ2hDLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDekMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUMzQyxnQkFBZ0I7WUFDaEIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLGtDQUFrQztRQUN0QyxDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF2Q1Esa0JBQWtCO1FBRDlCLGlCQUFVLEVBQUU7O09BQ0Esa0JBQWtCLENBeUM5QjtJQUFELHlCQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7QUF6Q1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZ2VvTG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdlb2xvY2F0aW9uU2VydmljZSB7XG5cbiAgICBsb2NhdGlvbjogTG9jYXRpb24gPSBuZXcgTG9jYXRpb24oKTtcbiAgICBsb2NhdGlvblN1YmplY3QgPSBuZXcgU3ViamVjdDxMb2NhdGlvbj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBlbWl0TG9jYXRpb24oKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb25TdWJqZWN0Lm5leHQodGhpcy5sb2NhdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERldmljZUxvY2F0aW9uKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBnZW9Mb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBnZW9Mb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IDMsIC8vbWV0ZXJzXG4gICAgICAgICAgICAgICAgICAgIG1heGltdW1BZ2U6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDUwMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihsb2NhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobG9jYXRpb24pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlTG9jYXRpb24oKSB7XG4gICAgICAgIHRoaXMuZ2V0RGV2aWNlTG9jYXRpb24oKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmxhdGl0dWRlID0gcmVzdWx0LmxhdGl0dWRlO1xuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5sb25naXR1ZGUgPSByZXN1bHQubG9uZ2l0dWRlO1xuICAgICAgICAgICAgLy8gZGF0YSBwcm9kdWNlclxuICAgICAgICAgICAgdGhpcy5lbWl0TG9jYXRpb24oKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0xvY2F0aW9uIHVwZGF0ZWQnKTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==