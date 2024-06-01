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
    console.error('Error fetching products:', error);
  }
}
