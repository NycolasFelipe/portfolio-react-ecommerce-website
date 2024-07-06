/**
 * This function asynchronously fetches product information for a specific category
 * from a backend API.
 * 
 * @param {string} category The product category to retrieve.
 * @returns {Promise<object>}
 * 
 * @author Nycolas Felipe
 */

export default async function getProductCategory(category) {
  const dev = window.location.hostname.includes("localhost");
  const url = dev ?
    "http://localhost:3000/products/category/" + category :
    "https://portfolio-react-ecommerce-server.vercel.app/products/category/" + category;
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.debug('Error fetching category: ', error);
  }
}
