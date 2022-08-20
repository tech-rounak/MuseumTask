// const { get } = require("../Controllers/museumController");

const  changeDate = (seconds) => {
    const timestamp = seconds;
    let date = new Date('January 1, 1970 00:00:00').setMilliseconds(timestamp);

    let searchDate = new Date(date).toISOString();

    let x = searchDate.length;
    searchDate = searchDate.substring(0,x-16);
    x = x-1;
    searchDate = searchDate + '01T00:00:00.000';

    
    return searchDate; 
}

const getFinalData = (getMonthYear,data) => {
    // console.log(data);

    var getMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let month = getMonth[parseInt(getMonthYear.substring(5,7))-1];
    let year = getMonthYear.substring(0,4);
    // console.log(getMonthYear)
    const object = data;
    // console.log(object);

    let low = {},high = {};
    let mi = 1e18 , ma = 0 , totalVisitors = 0;
    
    for (const property in object) {
        totalVisitors = totalVisitors + parseInt(object[property]);
        if(parseInt(object[property]) > ma){
            ma = parseInt(object[property]);
            high={
                "museum":property,
                "visitors":object[property]
            }
        }
        if(parseInt(object[property]) < mi){
            mi = parseInt(object[property]);
            low={
                "museum":property,
                "visitors":object[property]
            }
        }
      }
      let finalData = {
        "year":year,
        "month":month,
        "highest":high,
        "lowest":low,
        "total":totalVisitors
      }

      return finalData;
}

module.exports.changeDate = changeDate;
module.exports.getFinalData = getFinalData;