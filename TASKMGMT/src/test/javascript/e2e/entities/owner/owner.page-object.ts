import { element, by, promise, ElementFinder } from 'protractor';

export class OwnerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-owner div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OwnerUpdatePage {
    pageTitle = element(by.id('jhi-owner-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    emailInput = element(by.id('field_email'));
    pictureInput = element(by.id('file_picture'));
    agreementInput = element(by.id('file_agreement'));
    textagreementInput = element(by.id('field_textagreement'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setEmailInput(email): promise.Promise<void> {
        return this.emailInput.sendKeys(email);
    }

    getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    setPictureInput(picture): promise.Promise<void> {
        return this.pictureInput.sendKeys(picture);
    }

    getPictureInput() {
        return this.pictureInput.getAttribute('value');
    }

    setAgreementInput(agreement): promise.Promise<void> {
        return this.agreementInput.sendKeys(agreement);
    }

    getAgreementInput() {
        return this.agreementInput.getAttribute('value');
    }

    setTextagreementInput(textagreement): promise.Promise<void> {
        return this.textagreementInput.sendKeys(textagreement);
    }

    getTextagreementInput() {
        return this.textagreementInput.getAttribute('value');
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
