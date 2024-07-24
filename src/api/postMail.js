/**
 * This function asynchronously sends an email using a fetch request to a backend API endpoint.
 * 
 * @param {object} data An object containg the content to be sent in the email.
 * @returns {void}
 * 
 * @author Nycolas Felipe
 */

export default async function postMail(data) {
  const dev = window.location.hostname.includes("localhost");
  const url = dev ?
    "http://localhost:3000/mail/post" :
    "https://portfolio-react-ecommerce-server.vercel.app/mail/post";
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        msg: {
          to: "nycolasfelipe.contato@gmail.com",
          from: "nycolasfelipe.contato@gmail.com",
          subject: data.subject,
          text: data.message
        },
        userMail: data.mail
      })
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.debug('Error updating user: ', error);
  }
}