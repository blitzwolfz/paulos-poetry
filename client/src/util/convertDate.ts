// The dates are stored as yyyy-mm-dd in the database

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const suffixMap = { "1": "st", "2": "nd", "3": "rd" } as { [key: string]: string };
const getSuffix = (day: string) => {
  const lastDigit = day[day.length - 1];
  return suffixMap[lastDigit] || "th";
};

export const convertDate = (date: string) => {
  const [year, month, day] = date.split("-");

  const monthName = months[parseInt(month) - 1];
  const suffix = getSuffix(day);

  return `${monthName} ${parseInt(day)}${suffix}, ${year}`;
};
