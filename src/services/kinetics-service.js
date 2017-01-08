export default function kineticsService() {
    return {
        getVelocity(accelArray) {
            let newArray = [];
            let timeStamp = 0;
            accelArray.forEach((element, index, array) => {
                if (index === (array.length - 1)) return;
                let time = ( Date.parse(array[index + 1].date) - Date.parse(element.date) ) / 1000; // because the return values are in ms
                timeStamp += time;
                let velocity = (1 / 2) * (array[index + 1].acceleration + element.acceleration) * time;
                newArray.push({time,timeStamp,velocity});
            });
            return new Promise((resolve, reject) => {
                resolve(newArray);
            });
        },
        getDistance(velArray) {
            let newArray = [];
            let timeStamp = 0;
            velArray.forEach((element, index, array) => {
                if (index === (array.length - 1)) return;
                let time = (array[index + 1].time + element.time) / 2;
                timeStamp += time;
                let distance = (1 / 2) * (array[index + 1].velocity + element.velocity) * time;
                newArray.push({time,timeStamp,distance});
            });
            return new Promise((resolve, reject) => {
                resolve(newArray);
            });
        },
        totalDistance(distArray) {
            return distArray.reduce((acc, curr) => {
                return acc + curr.distance; 
            }, 0);
        }
    };
};
