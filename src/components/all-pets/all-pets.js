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
      { breed: 'working dogs', exerciseNeed: 120 },
      { breed: 'terriers', exerciseNeed: 110 },
      { breed: 'retrievers', exerciseNeed: 90 },
      { breed: 'hounds', exerciseNeed: 70 },
      { breed: 'spaniels/miniatures', exerciseNeed: 50 },
      { breed: 'bulldogs', exerciseNeed: 30 },
      { breed: 'lapdogs', exerciseNeed: 20 }
    ];
    this.selectedBreed = null;

    this.renderExercise = function(){
        console.log('selectedBreed: ', this.selectedBreed);
    };

    this.addPet = function(){
        petsService.addPet({
            name: this.name,
            age: this.age,
            weight: this.weight,
            breed: this.selectedBreed
        });
    };
}
