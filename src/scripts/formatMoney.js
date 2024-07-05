/**
 * This function formats a number as currency with Brazilian Real (BRL) formatting.
 * 
 * @param {number} number The number to be formatted as currency.
 * @returns {string}
 * 
 * @example
 * const productPrice = 123.45;
 * const formattedPrice = formatMoney(productPrice);
 * console.log(formattedPrice); // Output: "R$ 123,45"
 * 
 * @author Nycolas Felipe
 */

const formatMoney = (number) => {
  if (Number.isNaN(number)) {
    console.debug("Provided value is not a number.");
    return "Error";
  }
  return number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export default formatMoney;