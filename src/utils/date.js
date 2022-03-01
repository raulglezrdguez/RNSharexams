export const daysInMonth = (month, year) => {
  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
    return 31;
  }
  if ([4, 6, 9, 11].includes(month)) {
    return 30;
  }
  // February has 29 days in any year evenly divisible by four,
  // EXCEPT for centurial years which are not also divisible by 400.
  return year % 4 === 0 && (!(year % 100 === 0) || year % 400 === 0) ? 29 : 28;
};

export const validateBirthdate = birthdate => {
  let validation = /^\d{1,2}-\d{1,2}-\d{4}$/.test(birthdate);
  if (!validation) {
    return false;
  }
  validation = birthdate.split('-');
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const day = +validation[0];
  const month = +validation[1];
  const year = +validation[2];
  if (year > currentYear || year < currentYear - 110) {
    return false;
  }
  if (month < 1 || month > 12) {
    return false;
  }
  if (year === currentYear && month > currentMonth) {
    return false;
  }
  if (year === currentYear && month === currentMonth && day > currentDay) {
    return false;
  }
  const maxDays = daysInMonth(month, year);
  if (day > maxDays) {
    return false;
  }

  return true;
};
