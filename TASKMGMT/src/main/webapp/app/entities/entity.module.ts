import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TaskmgmtOwnerModule } from './owner/owner.module';
import { TaskmgmtTaskModule } from './task/task.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TaskmgmtOwnerModule,
        TaskmgmtTaskModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaskmgmtEntityModule {}
