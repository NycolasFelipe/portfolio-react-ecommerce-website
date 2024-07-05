/**
 * This function removes accents from a string.
 * It converts the string to a normalized Unicode format.
 * 
 * @param {string} str String to be normalized.
 * @returns {string}
 * 
 * @example
 * const sentence = removeAccents("Antoine de Saint-Exupéry");
 * console.log(sentence); // Output: "Antoine de Saint-Exupery"
 * 
 * @author Nycolas Felipe
 */

const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export default removeAccents;