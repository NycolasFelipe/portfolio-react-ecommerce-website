export default async function getProduct(id = null) {
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
    console.debug('Error fetching products:', error);
  }
}
