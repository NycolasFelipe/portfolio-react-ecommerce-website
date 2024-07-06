/**
 * This function asynchronously fetches product information from a backend API.
 * It allows retrieving either a specific product by ID or all products if no
 * ID is provided.
 * 
 * @param {number} id [Optional]: The unique identifier of the product to retrieve.
 * If omitted (set to null), the function retrieves all products.
 * @returns {Promise<object>}
 * 
 * @author Nycolas Felipe
 */

export default async function getProduct(id = null) {
  if (typeof (id) !== "number" && id !== null) {
    console.debug("getProductInfo - error: productId is not a valid integer number");
    return {};
  }
  const dev = window.location.hostname.includes("localhost");
  const url = id ?
    (dev ? "http://localhost:3000/products/" : "https://portfolio-react-ecommerce-server.vercel.app/products/") + id :
    (dev ? "http://localhost:3000/products" : "https://portfolio-react-ecommerce-server.vercel.app/products");
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    id ?
      (console.debug(`Error fetching product with id ${id}: ${error}`)) :
      (console.debug(`Error fetching products: ${error}`));
  }
}
