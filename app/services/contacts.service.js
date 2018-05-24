"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var contacts = require("nativescript-contacts");
var permissions = require("nativescript-permissions");
var ContactsService = /** @class */ (function () {
    function ContactsService() {
    }
    ContactsService.prototype.reqPerm = function () {
        permissions.requestPermission(android.Manifest.permission.READ_CONTACTS, android.Manifest.permission.WRITE_CONTACTS, "I need these permissions because I'm cool")
            .then(function () {
            console.log("Woo Hoo, I have the power!");
        })
            .catch(function () {
            console.log("Uh oh, no permissions - plan B time!");
        });
    };
    ContactsService.prototype.selectContactToAdd = function () {
        var _this = this;
        return contacts.getContact().then(function (args) {
            /// Returns args:
            /// args.data: Generic cross platform JSON object
            /// args.reponse: "selected" or "cancelled" depending on wheter the user selected a contact. 
            if (args.response === "selected") {
                var contact = args.data; //See data structure below
                // lets say you wanted to grab first name and last name
                // console.log(JSON.stringify(contact));
                if (contact.emailAddresses[0].value) {
                    _this.newContact = contact.emailAddresses[0].value;
                    //console.log("contact du service : " + this.newContact);
                }
                else {
                    //console.log('Pas d\'email associé à ce contact');
                    alert('Pas d\'email associé à ce contact');
                }
            }
        });
    };
    ContactsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ContactsService);
    return ContactsService;
}());
exports.ContactsService = ContactsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRhY3RzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFHaEQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFHdEQ7SUFJSTtJQUFnQixDQUFDO0lBRWpCLGlDQUFPLEdBQVA7UUFDSSxXQUFXLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSwyQ0FBMkMsQ0FBQzthQUNoSyxJQUFJLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDRDQUFrQixHQUFsQjtRQUFBLGlCQXFCQztRQXBCRyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7WUFDM0MsaUJBQWlCO1lBQ2pCLGlEQUFpRDtZQUNqRCw2RkFBNkY7WUFFekYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsMEJBQTBCO2dCQUVuRCx1REFBdUQ7Z0JBQ3ZELHdDQUF3QztnQkFDeEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxLQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUNsRCx5REFBeUQ7Z0JBRTdELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osbURBQW1EO29CQUNuRCxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztnQkFDL0MsQ0FBQztZQUNMLENBQUM7UUFDRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFyQ1EsZUFBZTtRQUQzQixpQkFBVSxFQUFFOztPQUNBLGVBQWUsQ0F1QzNCO0lBQUQsc0JBQUM7Q0FBQSxBQXZDRCxJQXVDQztBQXZDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbnZhciBjb250YWN0cyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY29udGFjdHNcIik7XG5cbmRlY2xhcmUgdmFyIGFuZHJvaWQ6YW55O1xudmFyIHBlcm1pc3Npb25zID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wZXJtaXNzaW9uc1wiKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbnRhY3RzU2VydmljZSB7XG5cbiAgICBuZXdDb250YWN0OiBTdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcmVxUGVybSgpIHtcbiAgICAgICAgcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb24oYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLlJFQURfQ09OVEFDVFMsIGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5XUklURV9DT05UQUNUUywgXCJJIG5lZWQgdGhlc2UgcGVybWlzc2lvbnMgYmVjYXVzZSBJJ20gY29vbFwiKVxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29vIEhvbywgSSBoYXZlIHRoZSBwb3dlciFcIik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVWggb2gsIG5vIHBlcm1pc3Npb25zIC0gcGxhbiBCIHRpbWUhXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RDb250YWN0VG9BZGQoKSB7XG4gICAgICAgIHJldHVybiBjb250YWN0cy5nZXRDb250YWN0KCkudGhlbigoYXJncykgPT4ge1xuICAgIC8vLyBSZXR1cm5zIGFyZ3M6XG4gICAgLy8vIGFyZ3MuZGF0YTogR2VuZXJpYyBjcm9zcyBwbGF0Zm9ybSBKU09OIG9iamVjdFxuICAgIC8vLyBhcmdzLnJlcG9uc2U6IFwic2VsZWN0ZWRcIiBvciBcImNhbmNlbGxlZFwiIGRlcGVuZGluZyBvbiB3aGV0ZXIgdGhlIHVzZXIgc2VsZWN0ZWQgYSBjb250YWN0LiBcbiAgICAgIFxuICAgICAgICBpZiAoYXJncy5yZXNwb25zZSA9PT0gXCJzZWxlY3RlZFwiKSB7XG4gICAgICAgICAgICB2YXIgY29udGFjdCA9IGFyZ3MuZGF0YTsgLy9TZWUgZGF0YSBzdHJ1Y3R1cmUgYmVsb3dcbiAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGxldHMgc2F5IHlvdSB3YW50ZWQgdG8gZ3JhYiBmaXJzdCBuYW1lIGFuZCBsYXN0IG5hbWVcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNvbnRhY3QpKTtcbiAgICAgICAgICAgIGlmIChjb250YWN0LmVtYWlsQWRkcmVzc2VzWzBdLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdDb250YWN0ID0gY29udGFjdC5lbWFpbEFkZHJlc3Nlc1swXS52YWx1ZTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY29udGFjdCBkdSBzZXJ2aWNlIDogXCIgKyB0aGlzLm5ld0NvbnRhY3QpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdQYXMgZFxcJ2VtYWlsIGFzc29jacOpIMOgIGNlIGNvbnRhY3QnKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUGFzIGRcXCdlbWFpbCBhc3NvY2nDqSDDoCBjZSBjb250YWN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=