import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosContact } from "react-icons/io";
import "./Contact.css";

export function Contact() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [user, setUser] = useState(
    {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  );

  let name, value;
  const data = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  return (
    <>
      <div className="contact-container">
        <div className="contant">
          <h2><IoIosContact className="contact-icon" /> Entre em contato</h2>
          <div className="form">
            <form method="POST">
              <h3>Formulário para contato</h3>
              <input
                type="text"
                name="name"
                id="name"
                value={user.name}
                placeholder="Digite seu nome completo"
                required
                autoComplete="off"
                onChange={(e) => data(e)}
              />
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                placeholder="Digite seu endereço de e-mail"
                required
                autoComplete="off"
                onChange={(e) => data(e)}
              />
              <input
                type="text"
                name="subject"
                id="subject"
                value={user.subject}
                placeholder="Informe o assunto do e-mail"
                required
                autoComplete="off"
                onChange={(e) => data(e)}
              />
              <textarea
                name="message"
                id="message"
                value={user.message}
                placeholder="Sua mensagem..."
                required
                autoComplete="off"
                onChange={(e) => data(e)}
              ></textarea>
              {
                isAuthenticated ?
                  <button type="submit">Enviar formulário</button>
                  :
                  <button onClick={() => loginWithRedirect()} type="submit">Login p/ enviar formulário</button>
              }
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
