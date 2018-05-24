"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var Subject_1 = require("rxjs/Subject");
var geolocation_service_1 = require("./geolocation.service");
var geoLocation = require("nativescript-geolocation");
var nativescript_geolocation_1 = require("nativescript-geolocation");
var EchoListService = /** @class */ (function () {
    function EchoListService(geolocationService) {
        this.geolocationService = geolocationService;
        this.echos = [];
        this.echosPortee = [];
        this.echosSubject = new Subject_1.Subject();
        this.echosPorteeSubject = new Subject_1.Subject();
        this.portee = 10000; // 10 kilomètres de portée
    }
    EchoListService.prototype.ngOnInit = function () {
        this.geolocationService.updateLocation();
        firebaseWebApi.database().ref('/msg');
    };
    EchoListService.prototype.emitEchos = function () {
        this.echosSubject.next(this.echos);
    };
    EchoListService.prototype.emitEchosPortee = function () {
        this.echosPorteeSubject.next(this.echosPortee);
    };
    EchoListService.prototype.saveEchos = function () {
        firebaseWebApi.database().ref('/msg').set(this.echos);
    };
    EchoListService.prototype.removeExpiratedEcho = function (id) {
        if (firebaseWebApi.database().ref('/msg/' + id)) {
            var msgRef = firebaseWebApi.database().ref('/msg/' + id);
            msgRef.remove()
                .then(function () {
                console.log('Remove succeeded');
            })
                .catch(function (error) {
                console.log('Remove failed : ' + error);
            });
        }
    };
    EchoListService.prototype.getEchos = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (firebaseWebApi.database().ref('/msg')) {
                firebaseWebApi.database().ref('/msg')
                    .on('value', function (data) {
                    _this.echosPortee = [];
                    if (data.val()) {
                        console.log('______________________');
                        data.val().forEach(function (element) {
                            if (element) {
                                // location de l'écho lorsqu'il a été émis
                                var msgLocation_1 = new nativescript_geolocation_1.Location();
                                msgLocation_1.latitude = element.latitude;
                                msgLocation_1.longitude = element.longitude;
                                _this.geolocationService.getDeviceLocation().then(function (result) {
                                    // location actuelle de l'utilisateur
                                    var userLocation = new nativescript_geolocation_1.Location();
                                    userLocation.latitude = result.latitude;
                                    userLocation.longitude = result.longitude;
                                    // distance (Castel - Palo Alto : 9433120 mètres)
                                    var distance = geoLocation.distance(msgLocation_1, userLocation);
                                    console.log('distance : ' + element.name + ' : ' + distance);
                                    if (distance < _this.portee) {
                                        _this.echosPortee.push(element);
                                    }
                                }).then(function () {
                                    _this.emitEchosPortee();
                                    resolve(_this.echosPortee);
                                });
                            }
                        });
                    }
                    _this.echos = data.val() ? data.val() : [];
                    _this.emitEchos();
                });
            }
        });
    };
    EchoListService.prototype.createNewEcho = function (newEcho) {
        this.echos.unshift(newEcho);
        this.saveEchos();
        this.emitEchos();
        this.emitEchosPortee();
    };
    EchoListService.prototype.getEcho = function (idEcho) {
        return new Promise(function (resolve, reject) {
            firebaseWebApi.database().ref('/msg/' + idEcho).once('value').then(function (data) {
                resolve(data.val());
            }, function (error) {
                reject(error);
            });
        });
    };
    EchoListService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [geolocation_service_1.GeolocationService])
    ], EchoListService);
    return EchoListService;
}());
exports.EchoListService = EchoListService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoby1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlY2hvLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE4RDtBQUU5RCxpRUFBb0U7QUFDcEUsd0NBQXVDO0FBQ3ZDLDZEQUEyRDtBQUMzRCxzREFBd0Q7QUFDeEQscUVBQW9EO0FBSXBEO0lBU0UseUJBQW9CLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBUDFELFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsZ0JBQVcsR0FBUyxFQUFFLENBQUM7UUFDdkIsaUJBQVksR0FBRyxJQUFJLGlCQUFPLEVBQVUsQ0FBQztRQUNyQyx1QkFBa0IsR0FBRyxJQUFJLGlCQUFPLEVBQVUsQ0FBQztRQUUzQyxXQUFNLEdBQVcsS0FBSyxDQUFDLENBQUMsMEJBQTBCO0lBRVcsQ0FBQztJQUU5RCxrQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHlDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsbUNBQVMsR0FBVDtRQUNFLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsNkNBQW1CLEdBQW5CLFVBQW9CLEVBQUU7UUFDcEIsRUFBRSxDQUFDLENBQUMs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U0FBUyxFQUFFLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELHVDQUFhLEdBQWIsVUFBYyxPQUFhO1FBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxpQ0FBTyxHQUFQLFVBQVEsTUFBTTtRQUNaLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FDaEIsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNkLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2hFLFVBQUMsSUFBSTtnQkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxFQUFFLFVBQUMsS0FBSztnQkFDUCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFsR1UsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQVU2Qix3Q0FBa0I7T0FUL0MsZUFBZSxDQW1HM0I7SUFBRCxzQkFBQztDQUFBLEFBbkdELElBbUdDO0FBbkdZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVjaG8gfSBmcm9tIFwiLi4vbW9kZWxzL2VjaG9cIjtcbmltcG9ydCBmaXJlYmFzZVdlYkFwaSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwJyk7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IEdlb2xvY2F0aW9uU2VydmljZSB9IGZyb20gJy4vZ2VvbG9jYXRpb24uc2VydmljZSc7XG5pbXBvcnQgKiBhcyBnZW9Mb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVjaG9MaXN0U2VydmljZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZWNob3M6IEVjaG9bXSA9IFtdO1xuICBlY2hvc1BvcnRlZSA6IGFueSA9IFtdO1xuICBlY2hvc1N1YmplY3QgPSBuZXcgU3ViamVjdDxFY2hvW10+KCk7XG4gIGVjaG9zUG9ydGVlU3ViamVjdCA9IG5ldyBTdWJqZWN0PEVjaG9bXT4oKTtcblxuICBwb3J0ZWU6IG51bWJlciA9IDEwMDAwOyAvLyAxMCBraWxvbcOodHJlcyBkZSBwb3J0w6llXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBnZW9sb2NhdGlvblNlcnZpY2U6IEdlb2xvY2F0aW9uU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS51cGRhdGVMb2NhdGlvbigpO1xuICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnJyk7XG4gIH1cblxuICBlbWl0RWNob3MoKSB7XG4gICAgdGhpcy5lY2hvc1N1YmplY3QubmV4dCh0aGlzLmVjaG9zKTtcbiAgfVxuXG4gIGVtaXRFY2hvc1BvcnRlZSgpIHtcbiAgICB0aGlzLmVjaG9zUG9ydGVlU3ViamVjdC5uZXh0KHRoaXMuZWNob3NQb3J0ZWUpO1xuICB9XG4gIHNhdmVFY2hvcygpIHtcbiAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpLnNldCh0aGlzLmVjaG9zKTtcbiAgfVxuXG4gIHJlbW92ZUV4cGlyYXRlZEVjaG8oaWQpIHtcbiAgICBpZiAoZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cvJyArIGlkKSkge1xuICAgICAgdmFyIG1zZ1JlZiA9IGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnLycgKyBpZCk7XG4gICAgbXNnUmVmLnJlbW92ZSgpXG4gICAgICAudGhlbigoKSA9PiB7IGNvbnNvbGUubG9nKCdSZW1vdmUgc3VjY2VlZGVkJyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4geyBjb25zb2xlLmxvZygnUmVtb3ZlIGZhaWxlZCA6ICcgKyBlcnJvcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRFY2hvcygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpKSB7XG4gICAgICAgICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cnKVxuICAgICAgICAgICAgLm9uKCd2YWx1ZScsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZWNob3NQb3J0ZWUgPSBbXTtcbiAgICAgICAgICAgICAgaWYgKGRhdGEudmFsKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnX19fX19fX19fX19fX19fX19fX19fXycpO1xuICAgICAgICAgICAgICAgIGRhdGEudmFsKCkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7IC8vIGRhdGFiYXNlIG5vbiB2aWRlXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvY2F0aW9uIGRlIGwnw6ljaG8gbG9yc3F1J2lsIGEgw6l0w6kgw6ltaXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1zZ0xvY2F0aW9uOiBMb2NhdGlvbiA9IG5ldyBMb2NhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBtc2dMb2NhdGlvbi5sYXRpdHVkZSA9IGVsZW1lbnQubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgIG1zZ0xvY2F0aW9uLmxvbmdpdHVkZSA9IGVsZW1lbnQubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5nZXREZXZpY2VMb2NhdGlvbigpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbiBhY3R1ZWxsZSBkZSBsJ3V0aWxpc2F0ZXVyXG4gICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJMb2NhdGlvbjogTG9jYXRpb24gPSBuZXcgTG9jYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICB1c2VyTG9jYXRpb24ubGF0aXR1ZGUgPSByZXN1bHQubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgICAgdXNlckxvY2F0aW9uLmxvbmdpdHVkZSA9IHJlc3VsdC5sb25naXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gZGlzdGFuY2UgKENhc3RlbCAtIFBhbG8gQWx0byA6IDk0MzMxMjAgbcOodHJlcylcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBnZW9Mb2NhdGlvbi5kaXN0YW5jZShtc2dMb2NhdGlvbiwgdXNlckxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGlzdGFuY2UgOiAnICsgZWxlbWVudC5uYW1lICsgJyA6ICcgKyBkaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgdGhpcy5wb3J0ZWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWNob3NQb3J0ZWUucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdEVjaG9zUG9ydGVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmVjaG9zUG9ydGVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLmVjaG9zID0gZGF0YS52YWwoKSA/IGRhdGEudmFsKCkgOiBbXTtcbiAgICAgICAgICAgICAgdGhpcy5lbWl0RWNob3MoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgIH0pXG4gICAgXG4gIH1cblxuICBjcmVhdGVOZXdFY2hvKG5ld0VjaG86IEVjaG8pIHtcbiAgICB0aGlzLmVjaG9zLnVuc2hpZnQobmV3RWNobyk7XG4gICAgdGhpcy5zYXZlRWNob3MoKTtcbiAgICB0aGlzLmVtaXRFY2hvcygpO1xuICAgIHRoaXMuZW1pdEVjaG9zUG9ydGVlKCk7XG4gIH1cblxuICBnZXRFY2hvKGlkRWNobykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cvJyArIGlkRWNobykub25jZSgndmFsdWUnKS50aGVuKFxuICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEudmFsKCkpO1xuICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuXG4iXX0=