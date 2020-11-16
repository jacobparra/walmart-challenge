/**
 * Check if string is a positive number
 * @param value String to validate
 */
const isNumeric = (value: string) => /^\d+$/.test(value);

/**
 * Check if phrase is palindrome
 * @param value String to validate
 */
const isPalindrome = (phrase: string) => phrase === phrase.split('').reverse().join('');

/**
 * Transform a number to chilean currency format
 * @param amount Number to format
 */
const formatCurrency = (amount: number): string => (
  new Intl.NumberFormat(
    'es-CL', { style: 'currency', currency: 'CLP' }
  ).format(amount)
);

export { isNumeric, isPalindrome, formatCurrency };
