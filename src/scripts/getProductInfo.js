import getProduct from "../api/getProduct";
import getProductDetail from "../api/getProductDetail";

/**
 * This asynchronous function retrieves information about a product identified
 * by its productId. It utilizes two separate API calls:
 * - `getProduct(productId)`: Fetches basic product information.
 * - `getProductDetail(productId)`: Retrieves detailed product information.
 * 
 * The retrieved data is then combined and processed before being returned.
 * 
 * @param {number} productId The unique identifier of the product to retrieve 
 * information for 
 * @returns {Promise<object> | object}
 * 
 * @author Nycolas Felipe
 */

async function getProductInfo(productId) {
  const id = parseInt(productId);
  if (typeof (id) !== "number") {
    console.debug("getProductInfo - error: productId is not a valid integer number");
    return {};
  }
  try {
    const product = await getProduct(id).then(data => data[0]);
    const productDetail = await getProductDetail(id);
    const description = JSON.parse(productDetail[0].Description.replace(/\\/g, ''));
    const details = JSON.parse(productDetail[0].Details.replace(/\\/g, ''));
    const stock = JSON.parse(productDetail[0].Stock);
    product.Info = { Description: description, Details: details, Stock: stock };
    return product;
  } catch (err) {
    console.debug(err);
    return {};
  }
}

export default getProductInfo;