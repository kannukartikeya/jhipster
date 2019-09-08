import { element, by, promise, ElementFinder } from 'protractor';

export class TaskComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-task div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TaskUpdatePage {
    pageTitle = element(by.id('jhi-task-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    processTypeSelect = element(by.id('field_processType'));
    taskNameInput = element(by.id('field_taskName'));
    descriptionInput = element(by.id('field_description'));
    appliesToInput = element(by.id('field_appliesTo'));
    datecompletionInput = element(by.id('field_datecompletion'));
    statusSelect = element(by.id('field_status'));
    prioritySelect = element(by.id('field_priority'));
    ownerSelect = element(by.id('field_owner'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setProcessTypeSelect(processType): promise.Promise<void> {
        return this.processTypeSelect.sendKeys(processType);
    }

    getProcessTypeSelect() {
        return this.processTypeSelect.element(by.css('option:checked')).getText();
    }

    processTypeSelectLastOption(): promise.Promise<void> {
        return this.processTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setTaskNameInput(taskName): promise.Promise<void> {
        return this.taskNameInput.sendKeys(taskName);
    }

    getTaskNameInput() {
        return this.taskNameInput.getAttribute('value');
    }

    setDescriptionInput(description): promise.Promise<void> {
        return this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    setAppliesToInput(appliesTo): promise.Promise<void> {
        return this.appliesToInput.sendKeys(appliesTo);
    }

    getAppliesToInput() {
        return this.appliesToInput.getAttribute('value');
    }

    setDatecompletionInput(datecompletion): promise.Promise<void> {
        return this.datecompletionInput.sendKeys(datecompletion);
    }

    getDatecompletionInput() {
        return this.datecompletionInput.getAttribute('value');
    }

    setStatusSelect(status): promise.Promise<void> {
        return this.statusSelect.sendKeys(status);
    }

    getStatusSelect() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    statusSelectLastOption(): promise.Promise<void> {
        return this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setPrioritySelect(priority): promise.Promise<void> {
        return this.prioritySelect.sendKeys(priority);
    }

    getPrioritySelect() {
        return this.prioritySelect.element(by.css('option:checked')).getText();
    }

    prioritySelectLastOption(): promise.Promise<void> {
        return this.prioritySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    ownerSelectLastOption(): promise.Promise<void> {
        return this.ownerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    ownerSelectOption(option): promise.Promise<void> {
        return this.ownerSelect.sendKeys(option);
    }

    getOwnerSelect(): ElementFinder {
        return this.ownerSelect;
    }

    getOwnerSelectedOption() {
        return this.ownerSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
