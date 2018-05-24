import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Echo } from '../../../models/echo';
import { EchoListService } from '../../../services/echo-list.service';

@Component({
    moduleId: module.id,
    selector: 'list-single',
    templateUrl: './list-single.html',
    styleUrls: ["./list-single-common.css", "./list-single.css"]
})

export class ListSingleComponent implements OnInit {

    echo: Echo;

    constructor(private echoListService: EchoListService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.echo = new Echo();
        const id = this.route.snapshot.params['id'];
        this.echoListService.getEcho(+id).then(
            (echo: Echo) => {
                this.echo = echo;
            }
        );
    }
}