import template from './snapshot.html';
import styles from './snapshot.scss';

export default {
    template, 
    controller,
    bindings: {
        snapshot: '<'
    }
};

controller.$inject = ['petSnapshotService', '$state'];

function controller(petSnapshotService, $state) {
    this.styles = styles;

    this.removeSnapshot = function(snapshot) {
        petSnapshotService.remove(this.snapshot._id)
        .then(() => {
            $state.go('stats');
        });
    };
}