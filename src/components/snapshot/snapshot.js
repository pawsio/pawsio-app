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
            let rawHikeLength = velArr[(velArr.length) - 1].timeStamp;
            if ((rawHikeLength/60) < .5) {
                this.hikeLengthMin = Math.ceil(rawHikeLength/60);
            } else {
                this.hikeLengthMin = Math.round(rawHikeLength/60);

            }
            this.hikeLengthMin = Math.ceil(rawHikeLength/60);
            this.velArr = velArr;
            return kineticsService.getDistance(this.velArr);
        })
        .then(distArr => {
            this.distArr = distArr;
            let rawDistance = kineticsService.totalDistance(this.distArr);
            this.distance = Math.round((rawDistance * 0.000621371) * 10) / 10;
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
