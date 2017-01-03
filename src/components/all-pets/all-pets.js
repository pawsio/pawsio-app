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
      { breed: 'Working dogs', exerciseNeed: 120 },
      { breed: 'Terriers', exerciseNeed: 110 },
      { breed: 'Retrievers', exerciseNeed: 90 },
      { breed: 'Hounds', exerciseNeed: 70 },
      { breed: 'Spaniels/Miniatures', exerciseNeed: 50 },
      { breed: 'Bulldogs', exerciseNeed: 30 },
      { breed: 'Lapdogs', exerciseNeed: 20 }
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
