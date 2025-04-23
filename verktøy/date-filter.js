const moment = require('moment');
moment.locale('nb');

module.exports = (value) => {
  const dateObject = moment(value);
  return `${dateObject.format('D')}. ${dateObject.format('MMMM YYYY')}`;
};