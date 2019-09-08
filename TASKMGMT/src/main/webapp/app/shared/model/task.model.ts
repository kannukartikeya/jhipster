import { Moment } from 'moment';
import { IOwner } from 'app/shared/model//owner.model';

export const enum ProcessType {
    Clarifications = 'Clarifications',
    Indexing = 'Indexing',
    Spreading = 'Spreading',
    Originations = 'Originations'
}

export const enum Status {
    SCHEDULED = 'SCHEDULED',
    STARTED = 'STARTED',
    COMPLETED = 'COMPLETED',
    ONHOLD = 'ONHOLD'
}

export const enum Priority {
    HIGH = 'HIGH',
    NORMAL = 'NORMAL',
    LOW = 'LOW'
}

export interface ITask {
    id?: number;
    processType?: ProcessType;
    taskName?: string;
    description?: string;
    appliesTo?: string;
    datecompletion?: Moment;
    status?: Status;
    priority?: Priority;
    owner?: IOwner;
}

export class Task implements ITask {
    constructor(
        public id?: number,
        public processType?: ProcessType,
        public taskName?: string,
        public description?: string,
        public appliesTo?: string,
        public datecompletion?: Moment,
        public status?: Status,
        public priority?: Priority,
        public owner?: IOwner
    ) {}
}
