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
    console.debug('Error: ', error);
  }
}
