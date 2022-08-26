

const  changeDate = (seconds) => {
    const timestamp = seconds;
    // converting the given date in milliseconds to reqruired timestamp format '2014-07-01T01:30:00.000Z'
    let date = new Date('January 1, 1970 00:00:00').setMilliseconds(timestamp);

    let searchDate = new Date(date).toISOString();
    // console.log(searchDate);
    // edditing the timestamp to search format '2014-07-01T00:00:00.000'
    let x = searchDate.length;
    searchDate = searchDate.substring(0,x-16);
    x = x-1;
    searchDate = searchDate + '01T00:00:00.000';
    // console.log(searchDate);
   

    return searchDate; 
}

const getFinalData = (getMonthYear,data,museumIgnore) => {
    var getMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let month = getMonth[parseInt(getMonthYear.substring(5,7))-1];
    let year = getMonthYear.substring(0,4);
    
    let low = {}/* for storing the museum with lowest visitors */
    let high = {}/* for storing the museum with highest visitors */
    let mi = 1e18 , ma = 0 , totalVisitors = 0;
    
    const object = data;
    for (const property in data) {
        if(property !== 'month' && property !== museumIgnore){
            totalVisitors = totalVisitors + parseInt(object[property]);  /* Adding the visitor to total vistors */
        
            if(parseInt(object[property]) > ma){
                ma = parseInt(object[property]);
                high = {
                    "museum":property,
                    "visitors":object[property]
                }
            }
            if(parseInt(object[property]) < mi){
                mi = parseInt(object[property]);
                low = {
                    "museum":property,
                    "visitors":object[property]
                }
            }
        }
      }

    //   creating the final data object for returning
      let finalData = {
        "attendance":{
            "year":year,
            "month":month,
            "highest":high,
            "lowest":low,
             "total":totalVisitors
        }
      }
      if(museumIgnore !== undefined && museumIgnore.length !== 0 && object[museumIgnore] !== undefined){

        //   creating the ignored object
        let ignore = {
            "museum": museumIgnore,
            "visitors": object[museumIgnore]
        }
        // adding ignored property to the finalData object
        finalData["Ignored"] = ignore;
      }
      return finalData;
}

module.exports.changeDate = changeDate;
module.exports.getFinalData = getFinalData