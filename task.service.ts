import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITask } from 'app/shared/model/task.model';

type EntityResponseType = HttpResponse<ITask>;
type EntityArrayResponseType = HttpResponse<ITask[]>;

@Injectable({ providedIn: 'root' })
export class TaskService {
    private resourceUrl = SERVER_API_URL + 'api/tasks';
    private resourceUrl2 = SERVER_API_URL + 'api/invoices-this-month';

    constructor(private http: HttpClient) {}

    create(task: ITask): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(task);
        return this.http
            .post<ITask>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    thisMonth(req?: any): Observable<EntityResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInvoice>(this.resourceUrl2, { params: options, observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(task: ITask): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(task);
        return this.http
            .put<ITask>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITask>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITask[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(task: ITask): ITask {
        const copy: ITask = Object.assign({}, task, {
            dateassigned: task.dateassigned != null && task.dateassigned.isValid() ? task.dateassigned.format(DATE_FORMAT) : null,
            datecompletion: task.datecompletion != null && task.datecompletion.isValid() ? task.datecompletion.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateassigned = res.body.dateassigned != null ? moment(res.body.dateassigned) : null;
        res.body.datecompletion = res.body.datecompletion != null ? moment(res.body.datecompletion) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((task: ITask) => {
            task.dateassigned = task.dateassigned != null ? moment(task.dateassigned) : null;
            task.datecompletion = task.datecompletion != null ? moment(task.datecompletion) : null;
        });
        return res;
    }
}
