import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTicketComponent } from './detail-ticket.component';
import {BackendService} from "../backend.service";
import {RouterTestingModule} from "@angular/router/testing";
import {ListTicketsComponent} from "../list-tickets/list-tickets.component";
import {of, throwError} from "rxjs";

describe('DetailTicketComponent', () => {
  let component: DetailTicketComponent;
  let fixture: ComponentFixture<DetailTicketComponent>;
  let backendService: BackendService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTicketComponent ],
      providers: [BackendService],
      imports: [RouterTestingModule.withRoutes([
        { path: 'listTickets', component: ListTicketsComponent },
        { path: 'detailTicket/:id', component: DetailTicketComponent }
      ])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTicketComponent);
    component = fixture.componentInstance;
    backendService = TestBed.inject(BackendService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should complete a task', () => {
    spyOn(backendService as any, 'complete').and.returnValue(of({}));
    component.completeTicket(0);
    expect(backendService.complete).toHaveBeenCalled();
    expect(component.completed).toBeTruthy();
  });

  it('should not complete a task when call to service failed', () => {
    spyOn(backendService as any, 'complete').and.returnValue(throwError({ status: 404 }));
    component.completeTicket(0);
    expect(backendService.complete).toHaveBeenCalled();
    expect(component.completed).toBeFalsy();
  });
});
