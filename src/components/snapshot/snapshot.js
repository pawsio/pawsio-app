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

function controller(kineticsService, petSnapshotService, temperatureService, userService, $state) {

    this.styles = styles;
    this.logout = () => userService.logout();
    this.isAuthenticated = () => userService.isAuthenticated();
    this.velArr = [];
    this.distArr = [];

    this.$onInit = function () {
        console.log('distanceGoal: ', this.pet.distanceGoal);
        let temp = temperatureService.getAvgTemp(this.snapshot.dataPayload);
        this.averageTemp = Math.round(temp);
        kineticsService.getVelocity(this.snapshot.dataPayload)
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
            this.runLengthChart();
            this.runDistanceChart();
        })
        .catch(err => console.err);
        
        this.runLengthChart = function () {
            var ctx = "lengthChart";
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Exercise Needed", "This Hike"],
                    datasets: [{
                        label: '# of Minutes',
                        data: [this.pet.exerciseNeed, this.hikeLengthMin],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        };

        this.runDistanceChart = function () {
            var ctx = "distanceChart";
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Distance Goal", "This Hike"],
                    datasets: [{
                        label: '# of Miles',
                        data: [this.pet.distanceGoal, this.distance],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        };
        
    };

    this.removeSnapshot = function(snapshot) {
        petSnapshotService.remove(this.snapshot._id)
        .then(() => {
            $state.go('stats');
        });
    };


}
