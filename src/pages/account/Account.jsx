import React from "react";
import { Link } from "react-router-dom";
import { IoChevronForwardSharp, IoHelpCircleOutline, IoWarningOutline } from "react-icons/io5";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { RiLogoutBoxLine, RiPencilLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../../components/button/Button";
import { EditProfile } from "./components/editProfile/EditProfile";
import "./Account.css";

export const Account = () => {
  const { user, logout } = useAuth0();

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
            <ul>
              <li className="selected"><RiPencilLine /> Editar Perfil</li>
              <li><FaRegBell /> Notificações</li>
              <li><AiOutlineLock /> Segurança</li>
              <li><GoGear /> Aparência</li>
              <li><IoHelpCircleOutline /> Ajuda</li>
              <li className="logout" onClick={() => logout()}><RiLogoutBoxLine /> Sair da conta</li>
            </ul>
          </div>
        </div>
        <div className="setting-item">
          <EditProfile user={user} />
          <div className="save">
            <div className="container">
              <Button text="Cancelar" />
              <Button text="Salvar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
