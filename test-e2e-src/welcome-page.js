export default class WelcomePage {
    constructor() {
        this.uiView = element(by.css('main ui-view'));
    }

    get() {
        return browser.get('/');
    }

    get title() {
        return browser.getTitle();
    }

    get url() {
        return browser.getLocationAbsUrl(); 
    }

    get stateComponent() {
        return this.uiView.all(by.css('*')).first().getTagName();

    }

}
