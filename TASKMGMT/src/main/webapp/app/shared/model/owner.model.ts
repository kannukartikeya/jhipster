import { ITask } from 'app/shared/model//task.model';

export interface IOwner {
    id?: number;
    name?: string;
    email?: string;
    pictureContentType?: string;
    picture?: any;
    agreementContentType?: string;
    agreement?: any;
    textagreement?: any;
    tasks?: ITask[];
}

export class Owner implements IOwner {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public pictureContentType?: string,
        public picture?: any,
        public agreementContentType?: string,
        public agreement?: any,
        public textagreement?: any,
        public tasks?: ITask[]
    ) {}
}
