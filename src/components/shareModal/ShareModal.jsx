import React, { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { IoMdClose } from "react-icons/io";
import { FaFacebookF, FaRegCopy, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { PiTelegramLogo } from "react-icons/pi";
import { EmailShareButton, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton, } from "react-share";
import "./ShareModal.css";

export const ShareModal = ({ handleShareModal }) => {
  const modalRef = useRef(null);
  const currentUrl = window.location.href;
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    { title: "Facebook", button: <FacebookShareButton url={currentUrl} />, icon: <FaFacebookF /> },
    { title: "X", button: <TwitterShareButton url={currentUrl} />, icon: <FaXTwitter /> },
    { title: "Telegram", button: <TelegramShareButton url={currentUrl} />, icon: <PiTelegramLogo /> },
    { title: "Whatsapp", button: <WhatsappShareButton url={currentUrl} />, icon: <FaWhatsapp /> },
    { title: "Email", button: <EmailShareButton url={currentUrl} />, icon: <MdOutlineEmail /> }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  useOutsideClick(modalRef, () => handleShareModal(false));

  return (
    <div className="share_modal" ref={modalRef}>
      <div className="container">
        <div className="header">
          <h2>Compartilhar</h2>
          <button className="close_button" onClick={() => handleShareModal(false)}><IoMdClose /></button>
        </div>
        <div className="share_options">
          {shareOptions.map((curElm, index) => {
            return (
              <div className="share_option" key={index}>
                <div className="icon">
                  {curElm.button}
                  {curElm.icon}
                </div>
                <div className="title">{curElm.title}</div>
              </div>
            )
          })}
        </div>
        <div className="share_link">
          <p>ou compartilhar com link</p>
          <div className="link_box">
            {copied &&
              <input className="confirm" value="Copiado!" type="text" disabled />
            }
            {!copied &&
              <input value={currentUrl} type="url" name="shareUrl" id="shareUrl" disabled />
            }
            <button type="button" title="Copiar link" onClick={() => handleCopy()}><FaRegCopy /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
