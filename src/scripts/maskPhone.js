import filterDigits from "./filterDigits";

/**
 * This function takes a string `values` (assumed to contain phone digits) and
 * formats it into a standard phone number format (e.g., "(12) 12345-6789").
 * It utilizes the `filterDigits` function to extract a maximum of 11 digits from
 * the input string.
 * 
 * @param {string} value The input string that may contain phone digits and other characters.
 * @returns {string}
 * 
 * @author Nycolas Felipe
 */

const maskPhone = (value) => {
  const digits = filterDigits(11, value);
  const maskedPhone = Array.prototype.reduce.call(digits, (acc, cur, index) => {
    if (index === 0) {
      return acc + "(" + cur;
    }
    if (index === 2) {
      return acc + ") " + cur;
    }
    if (index === 6) {
      return acc + "-" + cur;
    }
    if (index === 10) {
      return acc
        .replace("-", "")
        .replace(new RegExp(`^(.{${10}})(.*)`), `$1${"-"}$2`)
        + cur;
    }
    return acc + cur;
  }, "");
  return maskedPhone;
}

export default maskPhone;