const moment = require('moment');

const date = moment();
console.log(date.format('dddd MMM Do, YYYY'));

const otherDate = moment();
console.log(otherDate.format('h:mm a'));
