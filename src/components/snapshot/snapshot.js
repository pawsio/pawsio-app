import template from './snapshot.html';
import styles from './snapshot.scss';
import Chart from 'chart.js';

export default {
    template, 
    controller,
    bindings: {
        snapshot: '<',
        pet: '<'
    }
};

controller.$inject = ['kineticsService', 'petSnapshotService', 'temperatureService', '$state'];

function controller(kineticsService, petSnapshotService, temperatureService, $state) {

    this.styles = styles;
    this.velArr = [];
    this.distArr = [];

    this.$onInit = function () {
        console.log('temp: ', this.snapshot.dataPayload);

        let temp = temperatureService.getAvgTemp(this.snapshot.dataPayload);
        this.averageTemp = Math.round(temp);

        console.log('average temp: ', this.averageTemp);

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
            this.runChart();
        })
        .catch(err => console.err);
        
        this.runChart = function () {
            var ctx = "myChart";
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
                            // 'rgba(255, 206, 86, 0.2)',
                            // 'rgba(75, 192, 192, 0.2)',
                            // 'rgba(153, 102, 255, 0.2)',
                            // 'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)'
                            // 'rgba(255, 206, 86, 1)',
                            // 'rgba(75, 192, 192, 1)',
                            // 'rgba(153, 102, 255, 1)',
                            // 'rgba(255, 159, 64, 1)'
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
