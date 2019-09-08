import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IOwner } from 'app/shared/model/owner.model';

@Component({
    selector: 'jhi-owner-detail',
    templateUrl: './owner-detail.component.html'
})
export class OwnerDetailComponent implements OnInit {
    owner: IOwner;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ owner }) => {
            this.owner = owner;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
