import template from './stats.html';
import styles from './stats.scss';

export default {
    template,
    controller
};

controller.$inject = ['userService'];

function controller(userService) {
    this.styles = styles;
    this.logout = () => userService.logout();
    this.isAuthenticated = () => userService.isAuthenticated();
}
