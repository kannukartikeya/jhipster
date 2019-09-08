/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TaskmgmtTestModule } from '../../../test.module';
import { OwnerDetailComponent } from 'app/entities/owner/owner-detail.component';
import { Owner } from 'app/shared/model/owner.model';

describe('Component Tests', () => {
    describe('Owner Management Detail Component', () => {
        let comp: OwnerDetailComponent;
        let fixture: ComponentFixture<OwnerDetailComponent>;
        const route = ({ data: of({ owner: new Owner(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaskmgmtTestModule],
                declarations: [OwnerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OwnerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OwnerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.owner).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
