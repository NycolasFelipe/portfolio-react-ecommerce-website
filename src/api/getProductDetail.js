export default async function getProductDetail(id) {
  const url = `https://portfolio-react-ecommerce-server.vercel.app/products/${id}/detail`;

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
