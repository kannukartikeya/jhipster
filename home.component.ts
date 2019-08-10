import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    constructor(private principal: Principal, private loginModalService: LoginModalService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
		this.getIncomeExpenseForThisMonth();
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

	getIncomeExpenseForThisMonth() {
        this.invoiceService.thisMonth().subscribe(
            (res: any) => {

                this.barchartdata = [];
                for (let i = res.body.monthWiseIncomeStatistics.length - 1; i >= 0; i--) {
                    this.barchartdata.push(res.body.monthWiseIncomeStatistics[i].actualTotal);
                    this.barChartLabels.push(res.body.monthWiseIncomeStatistics[i].monthText);
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

 	private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

}
