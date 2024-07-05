import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronForwardSharp, IoHelpCircleOutline } from "react-icons/io5";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { RiLogoutBoxLine, RiPencilLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { useAuth0 } from "@auth0/auth0-react";
import { EditProfile } from "./components/editProfile/EditProfile";
import Slider from "react-slick";
import UserContext from "../../context/user/UserContext";
import "./Account.css";

export const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const { logout } = useAuth0();
  const [menuSettings, setMenuSettings] = useState({
    editarPerfil: true,
    notificacoes: false,
    seguranca: false,
    aparencia: false,
    ajuda: false
  });
  const sliderSettings = {
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    swipeToSlide: true,
    variableWidth: true,
    initialSlide: 0,
    arrows: false,
  }

  const handleSettingsMenu = (e) => {
    const setting = e.currentTarget.classList.value.replace("selected", "").trim();
    setMenuSettings(prev => {
      const temp = Object.fromEntries(Object.keys(prev).map((key) => [key, false]));
      temp[setting] = true;
      return temp;
    });
  }

  return (
    <div className="account-container">
      <div className="account-header">
        <div className="contant">
          <h2><AiOutlineUser className="account-icon" /> Conta</h2>
          <p><Link to="/" className="link">Início <IoChevronForwardSharp className="chevron" /></Link></p>
          <p>Conta</p>
        </div>
      </div>
      <div className="container">
        <div className="settings">
          <h3>Ajustes</h3>
          <div className="container">
            <ul className="settings-desktop">
              <li
                onClick={(e) => handleSettingsMenu(e)}
                className={`editarPerfil ${menuSettings.editarPerfil ? "selected" : ""}`}>
                <RiPencilLine /> Editar perfil</li>
              <li
                onClick={(e) => handleSettingsMenu(e)}
                className={`notificacoes ${menuSettings.notificacoes ? "selected" : ""}`}>
                <FaRegBell /> Notificações</li>
              <li
                onClick={(e) => handleSettingsMenu(e)}
                className={`seguranca ${menuSettings.seguranca ? "selected" : ""}`}>
                <AiOutlineLock /> Segurança</li>
              <li
                onClick={(e) => handleSettingsMenu(e)}
                className={`aparencia ${menuSettings.aparencia ? "selected" : ""}`}>
                <GoGear /> Aparência</li>
              <li
                onClick={(e) => handleSettingsMenu(e)}
                className={`ajuda ${menuSettings.ajuda ? "selected" : ""}`}>
                <IoHelpCircleOutline /> Ajuda</li>
              <li
                onClick={() => logout()}
                className="logout">
                <RiLogoutBoxLine /> Sair da conta</li>
            </ul>
            <ul className="settings-mobile">
              <Slider {...sliderSettings}>
                <li
                  onClick={(e) => handleSettingsMenu(e)}
                  className={`editarPerfil ${menuSettings.editarPerfil ? "selected" : ""}`}>
                  <RiPencilLine /> Editar perfil</li>
                <li
                  onClick={(e) => handleSettingsMenu(e)}
                  className={`notificacoes ${menuSettings.notificacoes ? "selected" : ""}`}>
                  <FaRegBell /> Notificações</li>
                <li
                  onClick={(e) => handleSettingsMenu(e)}
                  className={`seguranca ${menuSettings.seguranca ? "selected" : ""}`}>
                  <AiOutlineLock /> Segurança</li>
                <li
                  onClick={(e) => handleSettingsMenu(e)}
                  className={`aparencia ${menuSettings.aparencia ? "selected" : ""}`}>
                  <GoGear /> Aparência</li>
                <li
                  onClick={(e) => handleSettingsMenu(e)}
                  className={`ajuda ${menuSettings.ajuda ? "selected" : ""}`}>
                  <IoHelpCircleOutline /> Ajuda</li>
                <li
                  onClick={() => logout()}
                  className="logout">
                  <RiLogoutBoxLine /> Sair da conta</li>
              </Slider>
            </ul>
          </div>
        </div>
        <div className="setting-item">
          {
            menuSettings.editarPerfil && (
              <EditProfile data={user} setUser={setUser} />
            )
          }
        </div>
      </div>
    </div>
  );
}
