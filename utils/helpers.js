const { formatDistance } = require('date-fns');

module.exports = {
  format_date: (date) => formatDistance(new Date(date), new Date()),
};
