import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DetailTicketComponent} from "../detail-ticket/detail-ticket.component";
import {ListTicketsComponent} from "../list-tickets/list-tickets.component";

const routes: Routes = [
  { path: 'listTickets', component: ListTicketsComponent },
  { path: 'detailTicket/:id', component: DetailTicketComponent },
  { path: '**', redirectTo: 'listTickets', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
