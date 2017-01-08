export default function temperatureService() {
    return {
        getAvgTemp(dataArr) {
            let tempTotal = null;
            let numberOfReadings = null;
            dataArr.forEach((element, index, array) => {
                tempTotal += element.temperature;
                numberOfReadings ++;
            });
            let tempAvg = tempTotal / numberOfReadings;
            return tempAvg;
        }
    };
}
