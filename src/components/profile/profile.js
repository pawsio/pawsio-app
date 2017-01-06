import template from './profile.html';
import styles from './profile.scss';

export default {
    template,
    controller,
    bindings: {
        pets: '<'
    }
};

controller.$inject = ['userService', '$state'];

function controller(userService, $state) {
    this.styles = styles;
    this.logout = () => userService.logout();
    this.isAuthenticated = () => userService.isAuthenticated();
}
