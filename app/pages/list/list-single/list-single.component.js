"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var echo_1 = require("../../../models/echo");
var echo_list_service_1 = require("../../../services/echo-list.service");
var ListSingleComponent = /** @class */ (function () {
    function ListSingleComponent(echoListService, router, route) {
        this.echoListService = echoListService;
        this.router = router;
        this.route = route;
    }
    ListSingleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.echo = new echo_1.Echo();
        var id = this.route.snapshot.params['id'];
        this.echoListService.getEcho(+id).then(function (echo) {
            _this.echo = echo;
        });
    };
    ListSingleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'list-single',
            templateUrl: './list-single.html',
            styleUrls: ["./list-single-common.css", "./list-single.css"]
        }),
        __metadata("design:paramtypes", [echo_list_service_1.EchoListService, router_1.Router, router_1.ActivatedRoute])
    ], ListSingleComponent);
    return ListSingleComponent;
}());
exports.ListSingleComponent = ListSingleComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zaW5nbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlzdC1zaW5nbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5RDtBQUN6RCw2Q0FBNEM7QUFDNUMseUVBQXNFO0FBU3RFO0lBSUksNkJBQW9CLGVBQWdDLEVBQVUsTUFBYyxFQUFVLEtBQXFCO1FBQXZGLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUFHLENBQUM7SUFFL0csc0NBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDbEMsVUFBQyxJQUFVO1lBQ1AsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBZFEsbUJBQW1CO1FBUC9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLG9CQUFvQjtZQUNqQyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxtQkFBbUIsQ0FBQztTQUMvRCxDQUFDO3lDQU11QyxtQ0FBZSxFQUFrQixlQUFNLEVBQWlCLHVCQUFjO09BSmxHLG1CQUFtQixDQWUvQjtJQUFELDBCQUFDO0NBQUEsQUFmRCxJQWVDO0FBZlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBFY2hvIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2VjaG8nO1xuaW1wb3J0IHsgRWNob0xpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvZWNoby1saXN0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnbGlzdC1zaW5nbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9saXN0LXNpbmdsZS5odG1sJyxcbiAgICBzdHlsZVVybHM6IFtcIi4vbGlzdC1zaW5nbGUtY29tbW9uLmNzc1wiLCBcIi4vbGlzdC1zaW5nbGUuY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgTGlzdFNpbmdsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBlY2hvOiBFY2hvO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlY2hvTGlzdFNlcnZpY2U6IEVjaG9MaXN0U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5lY2hvID0gbmV3IEVjaG8oKTtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcbiAgICAgICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZ2V0RWNobygraWQpLnRoZW4oXG4gICAgICAgICAgICAoZWNobzogRWNobykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWNobyA9IGVjaG87XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxufSJdfQ==