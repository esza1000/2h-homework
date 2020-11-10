import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTicketsComponent } from './list-tickets.component';
import {RouterTestingModule} from "@angular/router/testing";
import {DetailTicketComponent} from "../detail-ticket/detail-ticket.component";
import {Router} from "@angular/router";
import {BackendService} from "../backend.service";
import {of, throwError} from "rxjs";

describe('ListTicketsComponent', () => {
  let component: ListTicketsComponent;
  let fixture: ComponentFixture<ListTicketsComponent>;
  let router: Router;
  let backendService: BackendService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTicketsComponent ],
      providers: [BackendService],
      imports: [RouterTestingModule.withRoutes([
        { path: 'listTickets', component: ListTicketsComponent },
        { path: 'detailTicket/:id', component: DetailTicketComponent }
      ])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTicketsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    backendService = TestBed.inject(BackendService);
    component.isShowForm = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  });

  it('should navigate to ticket detail', () => {
    spyOn(router, 'navigate');
    component.goToDetail(0);
    expect(router.navigate).toHaveBeenCalledWith(['detailTicket', 0])
  });

  it('should create a new ticket', () => {
    spyOn(router, 'navigate');
    spyOn(backendService as any, 'newTicket').and.returnValue(of({}));
    component.createNewTicket();
    expect(backendService.newTicket).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['listTickets']);
    expect(component.isShowForm).toBeTruthy();
  });

  it('should toggle creation form when ticket creation failed', () => {
    spyOn(router, 'navigate');
    spyOn(backendService as any, 'newTicket').and.returnValue(throwError({ status: 404 }));
    component.createNewTicket();
    expect(backendService.newTicket).toHaveBeenCalled();
    expect(router.navigate).not. toHaveBeenCalled();
    expect(component.isShowForm).toBeTruthy();
  });

});
