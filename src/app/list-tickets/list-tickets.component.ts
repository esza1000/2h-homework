import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../interfaces/user.interface";
import {Ticket} from "../../interfaces/ticket.interface";
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {tick} from "@angular/core/testing";

@Component({
    selector: 'app-list-tickets',
    templateUrl: './list-tickets.component.html',
    styleUrls: ['./list-tickets.component.css']
})
export class ListTicketsComponent implements OnInit {
    public readonly tickets$: Observable<Ticket[]> = this.backendService.tickets();
    ticketDescription: FormControl;
    isShowForm = false;

    constructor(private readonly backendService: BackendService, private readonly router: Router) {
    }

    ngOnInit(): void {
        this.ticketDescription = new FormControl('', [Validators.required]);
    }

    goToDetail(id: number) {
        this.router.navigate(['detailTicket', id]);
    }

    toggleDisplayForm() {
        this.isShowForm = !this.isShowForm;
    }

    createNewTicket() {
        this.backendService.newTicket({description: this.ticketDescription.value}).subscribe(
            () => {
                this.router.navigate(['listTickets']);
                this.toggleDisplayForm()
            }, () => {
                this.toggleDisplayForm()
            });
    }
}
