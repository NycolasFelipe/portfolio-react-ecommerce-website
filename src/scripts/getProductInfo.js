import getProduct from "../api/getProduct";
import getProductDetail from "../api/getProductDetail";

async function getProductInfo(productId) {
  let productInfo;
  try {
    const product = await getProduct(productId);
    const productDetail = await getProductDetail(productId);
    // Combine data 
    productInfo = product[0];
    productInfo.Info = productDetail;

    // Convert JSON data
    let description = productInfo.Info[0].Description.replace(/\\/g, '');
    let details = productInfo.Info[0].Details.replace(/\\/g, '');
    description = JSON.parse(description);
    details = JSON.parse(details);
    productInfo.Info[0].Description = description;
    productInfo.Info[0].Details = details;

  } catch (err) {
    console.error(err);
  } finally {
    return productInfo;
  }
}

export default getProductInfo;