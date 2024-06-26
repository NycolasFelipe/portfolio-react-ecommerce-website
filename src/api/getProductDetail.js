export default async function getProductDetail(id) {
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
    console.error('Error fetching products:', error);
  }
}
