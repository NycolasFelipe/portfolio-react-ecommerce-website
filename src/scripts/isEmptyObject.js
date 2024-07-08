/**
 * This function checks if the provided argument (obj) is an empty object. 
 * An empty object is considered to have no enumerable, own properties.
 * 
 * @param {object} obj The object to be checked. This can be any value, but the 
 * function is designed to work specifically with objects. 
 * @returns {boolean}
 * 
 * @author Nycolas Felipe
 */

const isEmptyObject = (obj) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

export default isEmptyObject;