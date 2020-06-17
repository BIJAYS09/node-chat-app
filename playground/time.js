const moment = require('moment');

//Jan 1st 1970 00:00:00 am

// var date = new Date();
// console.log(date.getFullYear());

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var createdAt = 12345;
var date = moment(createdAt);
console.log(date.format('YYYY-MMM-DD h:mm a'));