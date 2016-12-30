import WelcomePage from './welcome-page';

describe('PawsIO App', function() {

    const welcome = new WelcomePage();

    it('should have a title', function() {
        welcome.get();
        expect(welcome.title).toEqual('PawsIO');
    });

    describe('navigation', function() {

        beforeEach(function() {
            welcome.get();
        });

        it('defaults to welcome page', function() {

            expect(welcome.url).toBe('/welcome');
            expect(welcome.stateComponent).toEqual('welcome');

        });

    });

});
