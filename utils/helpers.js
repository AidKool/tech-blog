module.exports = {
  format_date: (date) =>
    Intl.DateTimeFormat('default', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date)),
  if_cond(v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
};
