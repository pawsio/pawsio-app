export default function kineticsService() {
    return {
        getVelocity(accelArray) {
            let newArray = [];
            accelArray.forEach((element, index, array) => {
                if (index === (array.length - 1)) return;
                let time = array[index + 1].date - element.date;
                let velocity = (1 / 2) * (array[index + 1].acceleration + element.acceleration) * time;
                newArray.push({time,velocity});
            });
            return newArray;
        },
        getDistance(velArray) {
            let newArray = [];
            velArray.forEach((element, index, array) => {
                if (index === (array.length - 1)) return;
                let time = array[index + 1].date - element.date;
                let distance = (1 / 2) * (array[index + 1].velocity + element.velocity) * time;
                newArray.push({time,distance});
            });
            return newArray;
        },
        totalDistance(distArray) {
            return distArray.reduce((acc, curr) => { return acc + curr; });
        }
    }
};