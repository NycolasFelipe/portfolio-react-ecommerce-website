export default async function updateUser(token, obj) {
    const dev = window.location.hostname.includes("localhost");
    const url = dev ?
        "http://localhost:3000/user/update" :
        "https://portfolio-react-ecommerce-server.vercel.app/user/update";
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: token, obj: obj })
        });
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        //
    }
}
