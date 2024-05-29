export default async function getAddress(zipcode) {
  const url = `https://viacep.com.br/ws/${zipcode}/json/`;

  try {
    const response = await fetch(url, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error: ', error);
  }
}
