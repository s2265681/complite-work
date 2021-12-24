function getCurrentTimeInfo() {
  const Date = new Date();
  const year = Date.getFullYear();
  const month = Date.getMonth() + 1;
  const date = Date.getDate();
  const hours = Date.getHours();
  const minutes = Date.getMinutes();
  return {
    year,
    month,
    date,
    hours,
    minutes,
  };
}

export {
  getCurrentTimeInfo
}