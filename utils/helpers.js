const { formatDistance } = require('date-fns');

module.exports = {
  format_date: (date) =>
    // Intl.DateTimeFormat('default', {
    //   day: '2-digit',
    //   month: '2-digit',
    //   year: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    // }).format(new Date(date)),
    formatDistance(new Date(date), new Date()),
};
