export default async function getProduct(id = null) {
  const url = id ? 
    `https://portfolio-react-ecommerce-server.vercel.app/products/${id}` :
    'https://portfolio-react-ecommerce-server.vercel.app/products';

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
