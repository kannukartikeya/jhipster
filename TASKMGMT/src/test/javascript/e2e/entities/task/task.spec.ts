import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { TaskComponentsPage, TaskUpdatePage } from './task.page-object';

describe('Task e2e test', () => {
    let navBarPage: NavBarPage;
    let taskUpdatePage: TaskUpdatePage;
    let taskComponentsPage: TaskComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tasks', () => {
        navBarPage.goToEntity('task');
        taskComponentsPage = new TaskComponentsPage();
        expect(taskComponentsPage.getTitle()).toMatch(/taskmgmtApp.task.home.title/);
    });

    it('should load create Task page', () => {
        taskComponentsPage.clickOnCreateButton();
        taskUpdatePage = new TaskUpdatePage();
        expect(taskUpdatePage.getPageTitle()).toMatch(/taskmgmtApp.task.home.createOrEditLabel/);
        taskUpdatePage.cancel();
    });

    it('should create and save Tasks', () => {
        taskComponentsPage.clickOnCreateButton();
        taskUpdatePage.processTypeSelectLastOption();
        taskUpdatePage.setTaskNameInput('taskName');
        expect(taskUpdatePage.getTaskNameInput()).toMatch('taskName');
        taskUpdatePage.setDescriptionInput('description');
        expect(taskUpdatePage.getDescriptionInput()).toMatch('description');
        taskUpdatePage.setAppliesToInput('appliesTo');
        expect(taskUpdatePage.getAppliesToInput()).toMatch('appliesTo');
        taskUpdatePage.setDatecompletionInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(taskUpdatePage.getDatecompletionInput()).toContain('2001-01-01T02:30');
        taskUpdatePage.statusSelectLastOption();
        taskUpdatePage.prioritySelectLastOption();
        taskUpdatePage.ownerSelectLastOption();
        taskUpdatePage.save();
        expect(taskUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
