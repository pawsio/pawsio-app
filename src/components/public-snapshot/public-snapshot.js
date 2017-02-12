import template from './public-snapshot.html';
import styles from './public-snapshot.scss';

export default {
    template,
    bindings: {
        snapshot: '<',
        pet: '<'
    },
    controller
};

controller.$inject = ['petsService', 'kineticsService', 'temperatureService', 'userService', '$state'];

function renderChart(canvasId, type, label, x, y, yLabel) {
    return new Chart(canvasId, {
        type: type,
        data: {
            labels: x, //what you want to say on your x axis
            datasets: [{
                label: label, //what you want to say on your x axis
                data: y,
                backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255,99,132,1)','rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }],
            options: {
                scales: {
                    yAxes: [ { ticks: { beginAtZero:true } } ]
                }
            }
        }
    });
};

function controller(petsService, kineticsService, temperatureService, userService, $state) {
    this.styles = styles;
    this.styles = styles;
    this.logout = () => userService.logout();
    this.isAuthenticated = () => userService.isAuthenticated();
    this.velArr = [];
    this.distArr = [];
    this.threshold = [];
    this.time = [];

    this.$onInit = function () {

        if (this.isAuthenticated()) petsService.getAll().then(pets => { this.pets = pets.pets; });
        else this.pets = [];

        console.log('distanceGoal: ', this.pet.distanceGoal);
        let temp = temperatureService.getAvgTemp(this.snapshot.dataPayload);
        this.averageTemp = Math.round(temp);

        this.snapshot.dataPayload.forEach((element, index, array) => { 
            this.threshold.push(element.threshold);
            this.time.push((Date.parse(element.date) - Date.parse(array[0].date))/1000); 
        });

        console.log('average temp: ', this.averageTemp);

        kineticsService
            .getVelocity(this.snapshot.dataPayload)
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
                this.runChart();
            })
            .catch(err => console.err);
        
        this.runChart = function () {
            let barLabelsOne = ['Exercise Needed', 'This Hike'];
            let barLabelsTwo = ['Distance Goal', 'This Hike'];
            let barDataOne = [this.pet.exerciseNeed, this.hikeLengthMin];
            let barDataTwo = [this.pet.distanceGoal, this.distance];
            renderChart('lengthChart', 'bar', '# of Minutes', barLabelsOne, barDataOne);
            renderChart('distanceChart', 'bar', '# of Miles', barLabelsTwo, barDataTwo);
            renderChart('mySound', 'line', 'Sound Intensity', this.time, this.threshold);
        };
    };
};