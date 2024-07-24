import React, { useState } from "react";
import { IoIosContact } from "react-icons/io";
import { IoChevronForwardSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Button } from "../../components/button/Button";
import validateEmail from "../../scripts/validateEmail";
import postMail from "../../api/postMail";
import styles from "./Contact.module.css";

export function Contact() {
  const [form, setForm] = useState({ name: "", mail: "", subject: "", message: "" });
  const [mailWarning, setMailWarning] = useState(false);

  const handleSubmit = () => {
    const validMail = validateEmail(form.mail);
    if (validMail) {
      setMailWarning(false);
      postMail(form);
      setTimeout(() => setForm({ name: "", mail: "", subject: "", message: "" }), 2000);
    } else {
      setMailWarning(true);
    }
  }

  return (
    <>
      <div className={styles.contact}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2><IoIosContact className={styles.icon} /> Entre em contato</h2>
            <p><Link to="/" className={styles.link}>Início <IoChevronForwardSharp className={styles.chevron} /></Link></p>
            <p>Contato</p>
          </div>
          <div className={styles.content}>
            <div className={styles.presentation}>
              <h3>Vamos conversar!</h3>
              <p>
              Interessado em um site como esse? Sinta-se à vontade para entrar em contato :)
              </p>
              <div className={styles.email}>
                <h4>Email</h4>
                <p><SiGmail className={styles.icon} /> nycolasfelipe.contato@gmail.com</p>
              </div>
              <div className={styles.social}>
                <h4>Redes sociais</h4>
                <p><a target="_blank" href="https://www.linkedin.com/in/nycolas-felipe/">
                  <FaGithub className={styles.icon} /> LinkedIn</a></p>
                <p><a target="_blank" href="https://github.com/NycolasFelipe">
                  <FaLinkedin className={styles.icon} /> GitHub</a></p>
                <p><a target="_blank" href="https://www.instagram.com/nyc_fel/">
                  <FaInstagram className={styles.icon} /> Instagram</a></p>
              </div>
            </div>
            <div className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <form method="POST">
                <div className={styles.name}>
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    required
                    autoComplete="off"
                    onChange={(e) => setForm(prevState => ({ ...prevState, name: e.target.value }))}
                  />
                </div>
                <div className={styles.email}>
                  <label htmlFor="email" className={mailWarning ? styles.email_warning : ""}>
                    Email {mailWarning && <span>- email inválido*</span>}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={form.mail}
                    required
                    autoComplete="off"
                    onChange={(e) => setForm(prevState => ({ ...prevState, mail: e.target.value }))}
                  />
                </div>
                <div className={styles.subject}>
                  <label htmlFor="subject">Assunto</label>
                  <input
                    type="text"
                    id="subject"
                    value={form.subject}
                    placeholder="Assunto do email"
                    required
                    autoComplete="off"
                    onChange={(e) => setForm(prevState => ({ ...prevState, subject: e.target.value }))}
                  />
                </div>
                <div className={styles.message}>
                  <label htmlFor="message">Mensagem</label>
                  <textarea
                    id="message"
                    value={form.message}
                    placeholder="Sua mensagem..."
                    required
                    autoComplete="off"
                    onChange={(e) => setForm(prevState => ({ ...prevState, message: e.target.value }))}
                  ></textarea>
                </div>
                <div className={styles.submit}>
                  <Button
                    initialText="Enviar formulário"
                    newText="Formulário enviado!"
                    disabled={!form.name || !form.mail || !form.subject || !form.message}
                    onClick={() => handleSubmit()}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
