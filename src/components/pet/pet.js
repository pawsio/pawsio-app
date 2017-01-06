import template from './pet.html';
import styles from './pet.scss';
import xeditable from 'angular-xeditable';

export default {
    template,
    controller,
    bindings: {
        pet: '<',
        petData: '<'
    }
};


controller.$inject = [ 'petsService', '$state', 'petSnapshotService' ];

function controller(petsService, $state, snapService) {
    this.styles = styles;

    this.$onInit = function () {
        let dataArr = this.petData.data;
        for (var i = 0; i < dataArr.length; i++) {
            let longDate = dataArr[i].date;
            let dateChunk = longDate.slice(0, 10);
            let timeChunk = longDate.slice(11, 16);
            let parts = dateChunk.split('-');
            let converted = [];
            converted[0] = parts[1];
            converted[1] = parts[2];
            converted[2] = parts[0];
            let convDate = converted.join('-');
            dataArr[i].prettyDate = convDate;
            dataArr[i].time = timeChunk;
        };
        this.dataPoints = dataArr;
    };

    this.removePet = function(pet){
        var result = confirm("Are you sure you want to delete?");
        if (result) {
            petsService.removePet(this.pet._id)
              .then(() => {
                  $state.go('profile');
              });
        }

    };

    this.removeSnap = function(snapshot, ev){
        ev.stopPropagation();
        var result = confirm("Are you sure you want to delete?");
        if (result) {
            console.log('this.snapshot: ', snapshot);
            snapService.remove(snapshot._id)
              .then(() => {
                  this.dataPoints.splice(this.dataPoints.indexOf(snapshot), 1);
              });
        };
    };

    this.updateSnap = function(data, dataName){
        console.log('data: ', data);
        snapService.updateSnap(data._id, { snapshotName: dataName})
        .then(() => {
            let index = this.dataPoints.indexOf(data);
            this.dataPoints[index].snapshotName = dataName;
        });
    };

    this.go = function(data){
        $state.go('snapshot', { id: data._id, petId: this.pet._id });
    };

}
