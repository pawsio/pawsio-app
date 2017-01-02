import template from './pet.html';
import styles from './pet.scss';

export default {
    template,
    controller,
    bindings: {
        pet: '<'
    }
};

controller.$inject = ['petSnapshotService'];

function controller(petSnapshotService) {
    this.styles = styles;
    const remy = '5868a8f7cd0c850011324469';
    petSnapshotService.get(remy).then(data => {
        this.petData = data;
    });

}

