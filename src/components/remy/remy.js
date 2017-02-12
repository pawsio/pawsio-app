import template from './remy.html';
import styles from './remy.scss';

export default {
    template,
    controller
};

controller.$inject = ['remyService', '$state', 'userService', 'petsService'];

function controller(remyService, $state, userService, petsService) {
    this.styles = styles;
    this.logout = () => userService.logout();
    this.isAuthenticated = () => userService.isAuthenticated();
    this.$onInit = () => {
        if (this.isAuthenticated()) petsService.getAll().then(pets => { this.pets = pets.pets; });
        else this.pets = [];

        remyService.getAll()
            .then(remy => {
                this.remy = remy;
                let dataArr = this.remy.data;
                for (let i = 0; i < dataArr.length; i++) {
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
            });
    };

    this.go = data => {
        $state.go('publicsnapshot', { id: data._id });
    };
}