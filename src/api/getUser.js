export default async function getUser(token) {
  const dev = window.location.hostname.includes("localhost");
  const url = dev ?
    "http://localhost:3000/user" :
    "https://portfolio-react-ecommerce-server.vercel.app/user";
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(token)
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.debug('Error fetching products:', error);
  }
}