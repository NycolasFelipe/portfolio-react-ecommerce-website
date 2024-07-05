/**
 * This function extracts digits from a given string (`viewString`) 
 * and limits the number of extracted digits to a specified maximum (`maxDigits`).
 * It returns a new string containing only the filtered digits, up to the maximum
 * allowed.
 * 
 * @param {number} maxDigits The maximum number of digits to extract from the string.
 * @param {string} viewString The input string that may contain digits and other characters.
 * @returns {string}
 * 
 * @author Nycolas Felipe
 */

const filterDigits = (maxDigits, viewString) => {
  if (typeof maxDigits !== "number") {
    console.debug("filterDigits: error - maxDigits is not a valid non-negative integer.");
    return "";
  }
  if (typeof viewString !== "string") {
    console.debug("filterDigits: error - viewString is not a valid string.");
    return "";
  }
  const filteredDigits = viewString.replace(/[^0-9]/g, '');
  return filteredDigits.slice(0, maxDigits);
}

export default filterDigits;