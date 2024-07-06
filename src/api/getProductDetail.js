/**
 * This function asynchronously fetches detailed information for a specific product
 * by its ID from a backend API.
 * 
 * @param {number} id The unique identifier of the product to retrieve details for.
 * @returns {Promise<object>}
 * 
 * @author Nycolas Felipe
 */

export default async function getProductDetail(id) {
  if (typeof (id) !== "number") {
    console.debug("getProductInfo - error: productId is not a valid integer number");
    return {};
  }
  const dev = window.location.hostname.includes("localhost");
  const url = dev ?
    "http://localhost:3000/products/" + id + "/detail" :
    "https://portfolio-react-ecommerce-server.vercel.app/products/" + id + "/detail";
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.debug(`Error fetching product detail with id ${id}: ${error}`);
  }
}
