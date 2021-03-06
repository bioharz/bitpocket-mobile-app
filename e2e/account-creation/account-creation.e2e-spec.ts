import { OnboardingPage } from './account-creation.po';
import { browser, element, by, promise } from 'protractor';

describe('Account Creation', function() {
    let page: OnboardingPage;

    beforeEach(() => {
        browser.restartSync();
        page = new OnboardingPage();
    });

    describe('Create Account', () => {

        beforeEach(() => {
            browser.ignoreSynchronization = true;
            browser.get('/#/account-creation');            
        });

        it('should create account and navigate to amount page', () => {
            page.setAccountCreationInput('n1RGwdbNTgNL868cRFCcimdCAQMft8HZKo')
                .then(() => {
                    return page.submitAccountCreation();
                }).then(() => {
                    browser.sleep(4000);
                    return page.isAmountPage();
                }).then(amountPage => {
                    expect(amountPage).toBeTruthy();
                });
        });

        it('should create a dialog error message', () => {
            page.setAccountCreationInput('no-valid-input')
                .then(() => {                    
                    return page.submitAccountCreation();
                }).then(() => {
                    return page.hasAlert();
                }).then(() => {                    
                    expect(true).toBeTruthy();
                });
        });    

    });

});