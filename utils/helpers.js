module.exports = {
  format_date: (date) =>
    Intl.DateTimeFormat('default', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date)),
};
