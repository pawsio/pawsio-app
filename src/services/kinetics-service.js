export default function kineticsService() {
    return {
        getVelocity(accelArray) {
            let newArray = [];
            accelArray.forEach((element, index, array) => {
                if (index === (array.length - 1)) return;
                let time = Date.parse(array[index + 1].date) - Date.parse(element.date);
                let velocity = (1 / 2) * (array[index + 1].acceleration + element.acceleration) * time;
                newArray.push({time,velocity});
            });
            return new Promise((resolve, reject) => {
                resolve(newArray);
            });
        },
        getDistance(velArray) {
            let newArray = [];
            velArray.forEach((element, index, array) => {
                if (index === (array.length - 1)) return;
                let time = array[index + 1].time - element.time;
                let distance = (1 / 2) * (array[index + 1].velocity + element.velocity) * time;
                newArray.push({time,distance});
            });
            return new Promise((resolve, reject) => {
                resolve(newArray);
            });
        },
        totalDistance(distArray) {
            console.log('distArr: ', distArray);
            return distArray.reduce((acc, curr) => { return acc.distance + curr.distance; });
        }
    };
};
