export const convertEnglishNumberToPersian = (input: number) => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return input
    .toString()
    .split('')
    .map(x => farsiDigits[x])
    .join('');
};
