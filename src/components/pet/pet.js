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

    this.removePet = function(pet){
        // event.stopPropagation();
        petsService.removePet(this.pet._id)
        .then(() => {
            $state.go('profile');
        });

    };

}
