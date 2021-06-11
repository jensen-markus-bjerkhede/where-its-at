function getMonthAndDate(dateString) {
  const date = new Date(dateString);
  return '' + date.getDate() + ' ' + getMonthAsString(date.getMonth());
}

function getTime(dateString, duration) {
  const date = new Date(dateString);
  let endDate = new Date(date);
  endDate.setHours(date.getHours() + duration)
  return getHourString(date) + ':' +  getMinutesString(date) + ' - ' + getHourString(endDate) + ':' +  getMinutesString(date);
}

function getMinutesString(date) {
  return (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
}

function getHourString(date) {
  return (date.getHours() < 10 ? '0' : '') + date.getHours();
}

function getMonthAsString(month) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return monthNames[month];
}
