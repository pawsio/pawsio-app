import template from './all-pets.html';
import styles from './all-pets.scss';

export default {
    template,
    bindings: {
        pets: '<'
    },
    controller
};

controller.$inject = ['petsService'];

function controller(petsService){
    this.styles = styles;


}
