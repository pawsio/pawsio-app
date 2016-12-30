'use strict';

var _welcomePage = require('./welcome-page');

var _welcomePage2 = _interopRequireDefault(_welcomePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PawsIO App', function () {

    var welcome = new _welcomePage2.default();

    it('should have a title', function () {
        welcome.get();
        expect(welcome.title).toEqual('PawsIO');
    });

    describe('navigation', function () {

        beforeEach(function () {
            welcome.get();
        });

        it('defaults to welcome page', function () {

            expect(welcome.url).toBe('/welcome');
            expect(welcome.stateComponent).toEqual('welcome');
        });
    });
});