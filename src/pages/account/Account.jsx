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
import styles from "./Account.module.css";

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
    const setting = e.currentTarget.getAttribute("setting-option");
    setMenuSettings(prev => {
      const temp = Object.fromEntries(Object.keys(prev).map((key) => [key, false]));
      temp[setting] = true;
      return temp;
    });
  }

  return (
    <div className={styles.account}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2><AiOutlineUser className={styles.icon} /> Conta</h2>
          <p><Link to="/" className={styles.link}>Início <IoChevronForwardSharp className={styles.chevron} /></Link></p>
          <p>Conta</p>
        </div>
        <div className={styles.settings}>
          <div className={styles.settings_panel}>
            <h3>Ajustes</h3>
            <div className={styles.container}>
              <ul className={styles.settings_desktop}>
                <li
                  onClick={(e) => handleSettingsMenu(e)}
                  setting-option="editarPerfil"
                  setting-selected={menuSettings.editarPerfil.toString()}>
                  <RiPencilLine /> Editar perfil</li>
                <li
                  onClick={(e) => handleSettingsMenu(e)}
                  setting-option="notificacoes"
                  setting-selected={menuSettings.notificacoes.toString()}>
                  <FaRegBell /> Notificações</li>
                <li
                  onClick={(e) => handleSettingsMenu(e)}
                  setting-option="seguranca"
                  setting-selected={menuSettings.seguranca.toString()}>
                  <AiOutlineLock /> Segurança</li>
                <li
                  onClick={(e) => handleSettingsMenu(e)}
                  setting-option="aparencia"
                  setting-selected={menuSettings.aparencia.toString()}>
                  <GoGear /> Aparência</li>
                <li
                  onClick={(e) => handleSettingsMenu(e)}
                  setting-option="ajuda"
                  setting-selected={menuSettings.ajuda.toString()}>
                  <IoHelpCircleOutline /> Ajuda</li>
                <li
                  onClick={() => logout()}
                  className="logout">
                  <RiLogoutBoxLine /> Sair da conta</li>
              </ul>
              <ul className={styles.settings_mobile}>
                <Slider {...sliderSettings}>
                  <li
                    onClick={(e) => handleSettingsMenu(e)}
                    setting-option="editarPerfil"
                    setting-selected={menuSettings.editarPerfil.toString()}>
                    <RiPencilLine /> Editar perfil</li>
                  <li
                    onClick={(e) => handleSettingsMenu(e)}
                    setting-option="notificacoes"
                    setting-selected={menuSettings.notificacoes.toString()}>
                    <FaRegBell /> Notificações</li>
                  <li
                    onClick={(e) => handleSettingsMenu(e)}
                    setting-option="seguranca"
                    setting-selected={menuSettings.seguranca.toString()}>
                    <AiOutlineLock /> Segurança</li>
                  <li
                    onClick={(e) => handleSettingsMenu(e)}
                    setting-option="aparencia"
                    setting-selected={menuSettings.aparencia.toString()}>
                    <GoGear /> Aparência</li>
                  <li
                    onClick={(e) => handleSettingsMenu(e)}
                    setting-option="ajuda"
                    setting-selected={menuSettings.ajuda.toString()}>
                    <IoHelpCircleOutline /> Ajuda</li>
                  <li
                    onClick={() => logout()}
                    className="logout">
                    <RiLogoutBoxLine /> Sair da conta</li>
                </Slider>
              </ul>
            </div>
          </div>
          <div className={styles.settings_content}>
            {menuSettings.editarPerfil && (
              <EditProfile data={user} setUser={setUser} />
            )}
            {menuSettings.notificacoes && (
              <img className={styles.icon_wip} alt="Em desenvolvimento" src="img/wip.png" />
            )}
            {menuSettings.seguranca && (
              <img className={styles.icon_wip} alt="Em desenvolvimento" src="img/wip.png" />
            )}
            {menuSettings.aparencia && (
              <img className={styles.icon_wip} alt="Em desenvolvimento" src="img/wip.png" />
            )}
            {menuSettings.ajuda && (
              <img className={styles.icon_wip} alt="Em desenvolvimento" src="img/wip.png" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
