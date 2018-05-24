"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var user_1 = require("../models/user");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var UserService = /** @class */ (function () {
    function UserService() {
        this._user = new user_1.User();
    }
    UserService.prototype.createNewUser = function (user) {
        return new Promise(function (resolve, reject) {
            firebaseWebApi.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(function () {
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    };
    UserService.prototype.signInUser = function (user) {
        return new Promise(function (resolve, reject) {
            firebaseWebApi.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(function () {
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    };
    UserService.prototype.signOutUser = function () {
        firebaseWebApi.auth().signOut();
        this._user = new user_1.User();
    };
    UserService.prototype.initUser = function () {
        var _this = this;
        var user = firebaseWebApi.auth().currentUser;
        var now = new Date();
        //console.log(JSON.stringify(user));
        this._user.email = user.email;
        this._user.uid = user.uid;
        this._user.currentLogin = now;
        this.getContacts();
        this.getLastLogin().then(function () { _this.updateUserDB(); });
    };
    UserService.prototype.updateUserDB = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            firebaseWebApi.database().ref('/user/' + _this.getUserId()).set(_this._user)
                .then(function (data) {
                resolve(data);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    UserService.prototype.getLastLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            firebaseWebApi.database().ref('/user/' + _this.getUserId() + '/currentLogin').once('value').then(function (data) {
                _this._user.lastLogin = data.val();
                console.log(JSON.stringify(data.val()));
                resolve(data.val());
            }, function (error) {
                reject(error);
            });
        });
    };
    UserService.prototype.getUserId = function () {
        return firebaseWebApi.auth().currentUser.uid;
    };
    UserService.prototype.updateContacts = function (contacts) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            firebaseWebApi.database().ref('/user/' + _this.getUserId() + '/contacts').set(contacts)
                .then(function (data) {
                resolve(data);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    UserService.prototype.getContactsDB = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var contacts = [];
            firebaseWebApi.database().ref('/user/' + _this.getUserId() + '/contacts')
                .on('value', function (data) {
                if (data.val()) {
                    data.val().forEach(function (element) {
                        contacts.push(element);
                    });
                    resolve(contacts);
                }
            });
        });
    };
    UserService.prototype.getContacts = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getContactsDB().then(function (args) {
                _this._user.contacts = args;
                resolve(args);
            });
        });
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLG1DQUFpQztBQUNqQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBRS9CLHVDQUFzQztBQUV0QyxpRUFBb0U7QUFHcEU7SUFJRTtRQUZBLFVBQUssR0FBUyxJQUFJLFdBQUksRUFBRSxDQUFDO0lBSXpCLENBQUM7SUFFRCxtQ0FBYSxHQUFiLFVBQWMsSUFBVTtRQUN0QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQ2hCLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDZCxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUM1RSxJQUFJLENBQ0g7Z0JBQ0UsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQ0YsQ0FBQztRQUNOLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxJQUFVO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FDaEIsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNkLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQ3hFLElBQUksQ0FDSDtnQkFDRSxPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FDRixDQUFDO1FBQ04sQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsaUNBQVcsR0FBWDtRQUNFLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxP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dGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9jYXRjaFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL21vZGVscy91c2VyXCI7XG5cbmltcG9ydCBmaXJlYmFzZVdlYkFwaSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwJyk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSB7XG5cbiAgX3VzZXI6IFVzZXIgPSBuZXcgVXNlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIFxuICB9XG5cbiAgY3JlYXRlTmV3VXNlcih1c2VyOiBVc2VyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmaXJlYmFzZVdlYkFwaS5hdXRoKCkuY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKHVzZXIuZW1haWwsIHVzZXIucGFzc3dvcmQpXG4gICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBzaWduSW5Vc2VyKHVzZXI6IFVzZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZpcmViYXNlV2ViQXBpLmF1dGgoKS5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCh1c2VyLmVtYWlsLCB1c2VyLnBhc3N3b3JkKVxuICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgc2lnbk91dFVzZXIoKSB7XG4gICAgZmlyZWJhc2VXZWJBcGkuYXV0aCgpLnNpZ25PdXQoKTtcbiAgICB0aGlzLl91c2VyID0gbmV3IFVzZXIoKTtcbiAgfVxuICBcbiAgaW5pdFVzZXIoKSB7XG4gICAgbGV0IHVzZXIgPSBmaXJlYmFzZVdlYkFwaS5hdXRoKCkuY3VycmVudFVzZXI7XG4gICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgdGhpcy5fdXNlci5lbWFpbCA9IHVzZXIuZW1haWw7XG4gICAgdGhpcy5fdXNlci51aWQgPSB1c2VyLnVpZDtcbiAgICB0aGlzLl91c2VyLmN1cnJlbnRMb2dpbiA9IG5vdztcbiAgICB0aGlzLmdldENvbnRhY3RzKCk7XG4gICAgdGhpcy5nZXRMYXN0TG9naW4oKS50aGVuKCgpID0+IHsgdGhpcy51cGRhdGVVc2VyREIoKSB9KTsgXG4gICAgfVxuICBcblxuICB1cGRhdGVVc2VyREIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvdXNlci8nICsgdGhpcy5nZXRVc2VySWQoKSkuc2V0KHRoaXMuX3VzZXIpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBnZXRMYXN0TG9naW4oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL3VzZXIvJyArIHRoaXMuZ2V0VXNlcklkKCkgKyAnL2N1cnJlbnRMb2dpbicpLm9uY2UoJ3ZhbHVlJykudGhlbihcbiAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdXNlci5sYXN0TG9naW4gPSBkYXRhLnZhbCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YS52YWwoKSkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEudmFsKCkpO1xuICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0IChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBnZXRVc2VySWQoKSB7XG4gICAgcmV0dXJuIGZpcmViYXNlV2ViQXBpLmF1dGgoKS5jdXJyZW50VXNlci51aWQ7XG4gIH1cblxuICB1cGRhdGVDb250YWN0cyhjb250YWN0cykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL3VzZXIvJyArIHRoaXMuZ2V0VXNlcklkKCkgKyAnL2NvbnRhY3RzJykuc2V0KGNvbnRhY3RzKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udGFjdHNEQigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHZhciBjb250YWN0cyA9IFtdO1xuICAgICAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL3VzZXIvJyArIHRoaXMuZ2V0VXNlcklkKCkgKyAnL2NvbnRhY3RzJylcbiAgICAgICAgICAub24oJ3ZhbHVlJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhLnZhbCgpKSB7XG4gICAgICAgICAgICAgIGRhdGEudmFsKCkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBjb250YWN0cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlc29sdmUoY29udGFjdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9XG5cbiAgZ2V0Q29udGFjdHMoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLmdldENvbnRhY3RzREIoKS50aGVuKChhcmdzKSA9PiB7XG4gICAgICAgIHRoaXMuX3VzZXIuY29udGFjdHMgPSBhcmdzO1xuICAgICAgICByZXNvbHZlKGFyZ3MpO1xuICAgICAgfSlcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iXX0=