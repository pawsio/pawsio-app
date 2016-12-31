import template from './user-auth.html';
import styles from './user-auth.scss';

export default {
    template,
    bindings: { success: '<' },
    controller
};

function controller() {
    this.action = 'signin';
}
