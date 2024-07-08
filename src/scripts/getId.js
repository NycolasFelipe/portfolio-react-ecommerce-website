/**
 * This function extract a user ID from a provided object (data). It assumes the ID is
 * stored within the sub property of the object and is the last 21 characters of that
 * property's value.
 * 
 * @param {object} data An object that may contain a sub property holding the user ID.
 * @returns {string}
 */

function getId(data) {
  try {
    const startIndex = data.sub.length - 21; // 21 is ID's total length
    const endIndex = data.sub.length;
    return data.sub.substring(startIndex, endIndex);
  } catch (error) {
    console.log("Error while getting id: ", error);
    return "invalidId";
  }
}

module.exports = getId;