import template from './pet.html';
import styles from './pet.scss';

export default {
    template,
    controller,
    bindings: {
        pet: '<',
        petData: '<'
    }
};

controller.$inject = [ 'petsService', '$state' ];

function controller(petsService, $state) {
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
        // event.stopPropagation();
        petsService.removePet(this.pet._id)
        .then(() => {
            $state.go('profile');
        });

    };

}
