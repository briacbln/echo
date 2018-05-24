"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var contacts_service_1 = require("../../services/contacts.service");
var user_service_1 = require("../../services/user.service");
var ContactsComponent = /** @class */ (function () {
    function ContactsComponent(contactsService, userService) {
        this.contactsService = contactsService;
        this.userService = userService;
        this.contacts = [];
        this.present = false;
    }
    ContactsComponent.prototype.ngOnInit = function () {
        this.showContacts();
    };
    ContactsComponent.prototype.ngAfterViewInit = function () {
        this.userService.getContacts();
    };
    ContactsComponent.prototype.findContacts = function () {
        var _this = this;
        this.contactsService.selectContactToAdd()
            .then(function () {
            _this.contacts.forEach(function (element) {
                if (element == _this.contactsService.newContact) {
                    _this.present = true;
                }
            });
            if (!_this.present) {
                _this.contacts.push(_this.contactsService.newContact);
            }
            else {
                alert("Ce contact est déjà présent dans la liste");
                console.log("Déjà présent dans la liste");
                _this.present = false;
            }
        });
    };
    ContactsComponent.prototype.delete = function (contact) {
        var index = this.contacts.indexOf(contact);
        this.contacts.splice(index, 1);
    };
    ContactsComponent.prototype.save = function () {
        this.userService.updateContacts(this.contacts);
    };
    ContactsComponent.prototype.showContacts = function () {
        var _this = this;
        this.userService.getContacts()
            .then(function (args) {
            _this.contacts = args;
            console.log(_this.contacts);
        });
    };
    ContactsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'contacts',
            templateUrl: './contacts.component.html',
            providers: [contacts_service_1.ContactsService, user_service_1.UserService],
            styleUrls: ['./contacts.component.css']
        }),
        __metadata("design:paramtypes", [contacts_service_1.ContactsService,
            user_service_1.UserService])
    ], ContactsComponent);
    return ContactsComponent;
}());
exports.ContactsComponent = ContactsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29udGFjdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlFO0FBQ2pFLG9FQUFrRTtBQUNsRSw0REFBMEQ7QUFVMUQ7SUFLQywyQkFDUyxlQUFnQyxFQUNoQyxXQUF3QjtRQUR4QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFMakMsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUNuQixZQUFPLEdBQVksS0FBSyxDQUFDO0lBSVksQ0FBQztJQUV0QyxvQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwyQ0FBZSxHQUFmO1FBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsd0NBQVksR0FBWjtRQUFBLGlCQWdCQztRQWZBLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUU7YUFDeEMsSUFBSSxDQUFDO1lBQ0wsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNoRCxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDckIsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDMUMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdEIsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVELGtDQUFNLEdBQU4sVUFBTyxPQUFPO1FBQ2IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxnQ0FBSSxHQUFKO1FBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCx3Q0FBWSxHQUFaO1FBQUEsaUJBT0M7UUFOQSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRTthQUM1QixJQUFJLENBQUMsVUFBQyxJQUFJO1lBQ1YsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUE7SUFFSixDQUFDO0lBbkRXLGlCQUFpQjtRQVI3QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsa0NBQWUsRUFBRSwwQkFBVyxDQUFDO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQ3ZDLENBQUM7eUNBUXlCLGtDQUFlO1lBQ25CLDBCQUFXO09BUHJCLGlCQUFpQixDQW9EN0I7SUFBRCx3QkFBQztDQUFBLEFBcERELElBb0RDO0FBcERZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250YWN0c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb250YWN0cy5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnY29udGFjdHMnLFxuXHR0ZW1wbGF0ZVVybDogJy4vY29udGFjdHMuY29tcG9uZW50Lmh0bWwnLFxuXHRwcm92aWRlcnM6IFtDb250YWN0c1NlcnZpY2UsIFVzZXJTZXJ2aWNlXSxcblx0c3R5bGVVcmxzOiBbJy4vY29udGFjdHMuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgQ29udGFjdHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG5cdGNvbnRhY3RzOiBhbnkgPSBbXTtcblx0cHJlc2VudDogQm9vbGVhbiA9IGZhbHNlO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgY29udGFjdHNTZXJ2aWNlOiBDb250YWN0c1NlcnZpY2UsXG5cdFx0cHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHtcdH1cblxuXHRuZ09uSW5pdCgpIHsgXG5cdFx0dGhpcy5zaG93Q29udGFjdHMoKTtcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHR0aGlzLnVzZXJTZXJ2aWNlLmdldENvbnRhY3RzKCk7XG5cdH1cblxuXHRmaW5kQ29udGFjdHMoKSB7XG5cdFx0dGhpcy5jb250YWN0c1NlcnZpY2Uuc2VsZWN0Q29udGFjdFRvQWRkKClcblx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHR0aGlzLmNvbnRhY3RzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdGlmIChlbGVtZW50ID09IHRoaXMuY29udGFjdHNTZXJ2aWNlLm5ld0NvbnRhY3QpIHtcblx0XHRcdFx0XHR0aGlzLnByZXNlbnQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0aWYgKCF0aGlzLnByZXNlbnQpIHtcblx0XHRcdFx0dGhpcy5jb250YWN0cy5wdXNoKHRoaXMuY29udGFjdHNTZXJ2aWNlLm5ld0NvbnRhY3QpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YWxlcnQoXCJDZSBjb250YWN0IGVzdCBkw6lqw6AgcHLDqXNlbnQgZGFucyBsYSBsaXN0ZVwiKTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJEw6lqw6AgcHLDqXNlbnQgZGFucyBsYSBsaXN0ZVwiKTtcblx0XHRcdFx0dGhpcy5wcmVzZW50ID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdGRlbGV0ZShjb250YWN0KSB7XG5cdFx0bGV0IGluZGV4ID0gdGhpcy5jb250YWN0cy5pbmRleE9mKGNvbnRhY3QpO1xuXHRcdHRoaXMuY29udGFjdHMuc3BsaWNlKGluZGV4LCAxKTtcdFxuXHR9XG5cblx0c2F2ZSgpIHtcblx0XHR0aGlzLnVzZXJTZXJ2aWNlLnVwZGF0ZUNvbnRhY3RzKHRoaXMuY29udGFjdHMpO1xuXHR9XG5cblx0c2hvd0NvbnRhY3RzKCkge1xuXHRcdHRoaXMudXNlclNlcnZpY2UuZ2V0Q29udGFjdHMoKVxuXHRcdFx0LnRoZW4oKGFyZ3MpID0+IHsgXG5cdFx0XHRcdHRoaXMuY29udGFjdHMgPSBhcmdzO1xuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbnRhY3RzKTtcblx0XHRcdH0pXG5cblx0fVxufSJdfQ==