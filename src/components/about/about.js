import template from './about.html';
import styles from './about.scss';

export default {
    template,
    controller
};

controller.$inject = ['userService', 'petsService'];

function controller(userService, petsService) {
    this.styles = styles;
    this.logout = () => userService.logout();
    this.isAuthenticated = () => userService.isAuthenticated();

    this.$onInit = () => {
        if (this.isAuthenticated()) petsService.getAll().then(pets => { this.pets = pets.pets; });
        else this.pets = [];
    };
};
