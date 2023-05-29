/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const isEven = (value: number): boolean => {
  if (value % 2 === 0) {
    return true;
  }
  return false;
};

export const getRandInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getCurrentStartOfWeek = () => {
  const currentDate = new Date();
  const pstTime = currentDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  const pstDate = new Date(pstTime);

  const dayOfWeek = pstDate.getDay(); // Sunday: 0, Monday: 1, ..., Saturday: 6
  const diff = pstDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Sundays

  const startOfWeek = new Date(pstDate.setDate(diff));

  const formattedDate = startOfWeek
    .toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '_');

  return formattedDate;
};

export const getCurrentStartOfMonth = () => {
  const currentDate = new Date();
  const pstTime = currentDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  const pstDate = new Date(pstTime);

  const year = pstDate.getFullYear();
  const month = pstDate.getMonth();

  const startOfMonth = new Date(year, month, 1);

  const formattedDate = startOfMonth
    .toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '_');

  return formattedDate;
};
