import { useEffect } from "react";
import "./Address.css";

export const Address = ({ address, setAddress }) => {
  return (
    <div className="address-field">
      <div className="container">
        <div className="item-group">
          <div className="item">
            <label htmlFor="logradouro">Logradouro</label>
            <input
              type="text"
              id="logradouro"
              value={address.logradouro ? address.logradouro : ""}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="complemento">Complemento</label>
            <input
              type="text"
              id="complemento"
              value={address.complemento ? address.complemento : ""}
              onChange={(e) => setAddress(prevState => ({ ...prevState, complemento: e.target.value }))}
            />
          </div>
        </div>
        <div className="item-group">
          <div className="item">
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              id="bairro"
              value={address.bairro ? address.bairro : ""}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              id="cidade"
              value={address.localidade ? address.localidade : ""}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              id="estado"
              value={address.uf ? address.uf : ""}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="numero">Número*</label>
            <input
              type="number"
              id="numero"
              value={address.numero ? address.numero : ""}
              onChange={(e) => setAddress(prevState => ({ ...prevState, numero: e.target.value }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
