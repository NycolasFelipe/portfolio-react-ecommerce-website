export default async function createUser(token) {
  const dev = window.location.hostname.includes("localhost");
  const url = dev ?
    "http://localhost:3000/user/create" :
    "https://portfolio-react-ecommerce-server.vercel.app/user/create";
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
    //
  }
}
