import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BackendService } from './backend.service';
import { DetailTicketComponent } from './detail-ticket/detail-ticket.component';
import { ListTicketsComponent } from './list-tickets/list-tickets.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [AppComponent, DetailTicketComponent, ListTicketsComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [BackendService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
