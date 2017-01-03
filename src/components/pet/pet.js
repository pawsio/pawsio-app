import template from './pet.html';
import styles from './pet.scss';

export default {
    template,
    controller,
    bindings: {
        pet: '<'
    }
};

function controller() {
    this.styles = styles;

}

