import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Ticket} from "../../interfaces/ticket.interface";
import {BackendService} from "../backend.service";
import {User} from "../../interfaces/user.interface";

@Component({
    selector: 'app-detail-ticket',
    templateUrl: './detail-ticket.component.html',
    styleUrls: ['./detail-ticket.component.css']
})
export class DetailTicketComponent implements OnInit {
    ticketId: number;
    user: User;
    assigned: boolean = false;
    completed: boolean = false;
    ticket$: Observable<Ticket>;
    users$: Observable<User[]> = this.backendService.users();

    constructor(private readonly backendService: BackendService, private route: ActivatedRoute, private readonly router: Router) {
    }

    ngOnInit(): void {
        this.ticketId = Number(this.route.snapshot.paramMap.get('id'));
        this.ticket$ = this.backendService.ticket(this.ticketId);
    }

    assignTicket(ticketId: number, userId: number) {
        this.backendService.assign(ticketId, userId).subscribe(() => {
            this.assigned = true;
            this.router.navigate(['detailTicket', ticketId]);
        }, () => {
        });
    }

    completeTicket(ticketId: number) {
        this.backendService.complete(ticketId, true).subscribe(() => {
            this.completed = true;
        }, () => {
            this.completed = false;
        });
    }
}
