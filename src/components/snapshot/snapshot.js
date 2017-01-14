import template from './snapshot.html';
import styles from './snapshot.scss';
import Chart from 'chart.js';

export default {
    template, 
    controller,
    bindings: {
        snapshot: '<',
        pet: '<',
        pets: '<'
    }
};

controller.$inject = ['kineticsService', 'petSnapshotService', 'temperatureService', 'userService', '$state'];

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

function controller(kineticsService, petSnapshotService, temperatureService, userService, $state) {
    this.styles = styles;
    this.logout = () => userService.logout();
    this.isAuthenticated = () => userService.isAuthenticated();
    this.velArr = [];
    this.distArr = [];
    this.threshold = [];
    this.time = [];

    this.$onInit = function () {
        console.log('distanceGoal: ', this.pet.distanceGoal);
        let temp = temperatureService.getAvgTemp(this.snapshot.dataPayload);
        // why isn't this part of the getAvgTemp service method?
        this.averageTemp = Math.round(temp);

        // hmm, this seems odd here. Logic seems duplicative of some of services.
        // I wonder if data on server should be better massaged
        this.snapshot.dataPayload.forEach((element, index, array) => { 
            this.threshold.push(element.threshold);
            this.time.push((Date.parse(element.date) - Date.parse(array[0].date))/1000); 
        });

        console.log('average temp: ', this.averageTemp);

        kineticsService
            .getVelocity(this.snapshot.dataPayload)
            .then(velArr => {
                // again, not sure why this isn't part of service
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

    this.removeSnapshot = function(snapshot) {
        petSnapshotService.remove(this.snapshot._id)
        .then(() => {
            $state.go('stats');
        });
    };
};