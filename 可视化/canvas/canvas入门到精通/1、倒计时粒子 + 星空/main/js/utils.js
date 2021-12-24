function getCurrentTimeInfo() {
  const myDate = new Date();
  const year = myDate.getFullYear();
  const month = myDate.getMonth() + 1;
  const date = myDate.getDate();
  const hours = myDate.getHours();
  const minutes = myDate.getMinutes();
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