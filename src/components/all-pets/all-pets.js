import template from './all-pets.html';
import styles from './all-pets.scss';

export default {
    template,
    bindings: {
        pets: '<'
    },
    controller
};

controller.$inject = [ 'petsService', '$state' ];

function controller(petsService, $state){
    this.styles = styles;

    // better to use a single object:
    // this.reset = () => this.pet = {};
    // and let the bindings create the properties

    this.reset = () => {
        this.name = '';
        this.age = '';
        this.weight = '';
        this.customBreed = '';
        this.selectedBreed = '';
        this.customExercise = '';
        this.distanceGoal = '';
    };

    this.reset();

    // should come from db?
    this.breeds = [
      { breed: 'Working Dog', exerciseNeed: 120 },
      { breed: 'Terrier', exerciseNeed: 110 },
      { breed: 'Retriever', exerciseNeed: 90 },
      { breed: 'Hound', exerciseNeed: 70 },
      { breed: 'Spaniel/Miniature', exerciseNeed: 50 },
      { breed: 'Bulldog', exerciseNeed: 30 },
      { breed: 'Lapdog', exerciseNeed: 20 },
      { breed: 'Other', value: 'Other' }
    ];
    this.selectedBreed = '';

    this.addPet = function(){

        let petToAdd = {
            name: this.name,
            age: this.age,
            weight: this.weight,
            distanceGoal: this.distanceGoal,
            breed: this.customBreed || this.selectedBreed.breed,
            exerciseNeed: this.customExercise || this.selectedBreed.exerciseNeed
        };

        petsService.addPet(petToAdd)
          .then(savedPet => {
              this.pets.push(savedPet);
              // 3. better to just do here, synchronous activity:
              this.reset();
          })
          // 1. this calls the reset function and passes the return
          // as the callback :(
          // .then(this.reset());
          // 2. this is what you meant:
          // .then(() => this.reset());
    };

}
