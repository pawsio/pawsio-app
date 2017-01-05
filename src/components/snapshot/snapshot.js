import template from './snapshot.html';
import styles from './snapshot.scss';

export default {
    template, 
    controller,
    bindings: {
        snapshot: '<'
    }
};

controller.$inject = ['kineticsService', 'petSnapshotService', '$state'];

function controller(kineticsService, petSnapshotService, $state) {
    this.styles = styles;
    this.velArr = [];
    this.distArr = [];

    this.$onInit = function () {
        kineticsService.getVelocity(this.snapshot.dataPayload)
        .then(velArr => {
            this.hikeLength = velArr[(velArr.length) - 1].timeStamp;
            this.velArr = velArr;
            return kineticsService.getDistance(this.velArr);
        })
        .then(distArr => {
            this.distArr = distArr;
            this.distance = kineticsService.totalDistance(this.distArr);
        })
        .catch(err => console.err);     
    };

    this.removeSnapshot = function(snapshot) {
        petSnapshotService.remove(this.snapshot._id)
        .then(() => {
            $state.go('stats');
        });
    };
}
