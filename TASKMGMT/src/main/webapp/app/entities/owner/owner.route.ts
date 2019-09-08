import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Owner } from 'app/shared/model/owner.model';
import { OwnerService } from './owner.service';
import { OwnerComponent } from './owner.component';
import { OwnerDetailComponent } from './owner-detail.component';
import { OwnerUpdateComponent } from './owner-update.component';
import { OwnerDeletePopupComponent } from './owner-delete-dialog.component';
import { IOwner } from 'app/shared/model/owner.model';

@Injectable({ providedIn: 'root' })
export class OwnerResolve implements Resolve<IOwner> {
    constructor(private service: OwnerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((owner: HttpResponse<Owner>) => owner.body);
        }
        return Observable.of(new Owner());
    }
}

export const ownerRoute: Routes = [
    {
        path: 'owner',
        component: OwnerComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'taskmgmtApp.owner.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'owner/:id/view',
        component: OwnerDetailComponent,
        resolve: {
            owner: OwnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'taskmgmtApp.owner.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'owner/new',
        component: OwnerUpdateComponent,
        resolve: {
            owner: OwnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'taskmgmtApp.owner.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'owner/:id/edit',
        component: OwnerUpdateComponent,
        resolve: {
            owner: OwnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'taskmgmtApp.owner.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ownerPopupRoute: Routes = [
    {
        path: 'owner/:id/delete',
        component: OwnerDeletePopupComponent,
        resolve: {
            owner: OwnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'taskmgmtApp.owner.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
