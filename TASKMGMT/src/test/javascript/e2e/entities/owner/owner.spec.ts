import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { OwnerComponentsPage, OwnerUpdatePage } from './owner.page-object';
import * as path from 'path';

describe('Owner e2e test', () => {
    let navBarPage: NavBarPage;
    let ownerUpdatePage: OwnerUpdatePage;
    let ownerComponentsPage: OwnerComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Owners', () => {
        navBarPage.goToEntity('owner');
        ownerComponentsPage = new OwnerComponentsPage();
        expect(ownerComponentsPage.getTitle()).toMatch(/taskmgmtApp.owner.home.title/);
    });

    it('should load create Owner page', () => {
        ownerComponentsPage.clickOnCreateButton();
        ownerUpdatePage = new OwnerUpdatePage();
        expect(ownerUpdatePage.getPageTitle()).toMatch(/taskmgmtApp.owner.home.createOrEditLabel/);
        ownerUpdatePage.cancel();
    });

    it('should create and save Owners', () => {
        ownerComponentsPage.clickOnCreateButton();
        ownerUpdatePage.setNameInput('name');
        expect(ownerUpdatePage.getNameInput()).toMatch('name');
        ownerUpdatePage.setEmailInput('email');
        expect(ownerUpdatePage.getEmailInput()).toMatch('email');
        ownerUpdatePage.setPictureInput(absolutePath);
        ownerUpdatePage.setAgreementInput(absolutePath);
        ownerUpdatePage.setTextagreementInput('textagreement');
        expect(ownerUpdatePage.getTextagreementInput()).toMatch('textagreement');
        ownerUpdatePage.save();
        expect(ownerUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
