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

    this.breeds = [
      { breed: 'Working Dogs', exerciseNeed: 120 },
      { breed: 'Terriers', exerciseNeed: 110 },
      { breed: 'Retrievers', exerciseNeed: 90 },
      { breed: 'Hounds', exerciseNeed: 70 },
      { breed: 'Spaniels/Miniatures', exerciseNeed: 50 },
      { breed: 'Bulldogs', exerciseNeed: 30 },
      { breed: 'Lapdogs', exerciseNeed: 20 },
      { breed: 'Other', value: 'Other' }
    ];
    this.selectedBreed = '';

    this.renderExercise = function(){
        console.log('selectedBreed: ', this.selectedBreed);
    };

    this.addPet = function(){

        let breedName = '';
        let exercise = null;
        let petToAdd = {
            name: this.name,
            age: this.age,
            weight: this.weight,
            breed: this.customBreed || this.selectedBreed.breed,
            exerciseNeed: this.customExercise || this.selectedBreed.exerciseNeed
        };

        console.log('petToAdd: ', petToAdd);

        // petsService.addPet();
    };
}
