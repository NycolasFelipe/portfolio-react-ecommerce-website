/**
 * This function asynchronously fetches address information for a given zip code
 * in Brazil using the ViaCEP API (https://viacep.com.br/).
 * 
 * @param {string} zipcode The Brazilian zip code for which to retrieve address
 * information.
 * @returns {Promise<object>}
 * 
 * @author Nycolas Felipe
 */

export default async function getAddress(zipcode) {
  const url = `https://viacep.com.br/ws/${zipcode}/json/`;
  try {
    const response = await fetch(url, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.debug('Error fetching zip code: ', error);
  }
}
