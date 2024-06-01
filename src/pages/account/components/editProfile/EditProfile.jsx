import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import getAddress from "../../../../api/getAddress";
import { maskPhone } from "../../../../scripts/maskPhone";
import { Address } from "../address/Address";
import { Button } from "../../../../components/button/Button";
import { useAuth0 } from "@auth0/auth0-react";
import updateUser from "../../../../api/updateUser";
import "./EditProfile.css";

export const EditProfile = ({ data }) => {
  const { user, getIdTokenClaims } = useAuth0();
  const [address, setAddress] = useState({ erro: true });
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");

  const handleZipcode = (e) => {
    const value = e.currentTarget.value.substring(0, 8);
    e.currentTarget.value = value;
    if (value.length === 8 && value !== zipcode) {
      setZipcode(value);
      getAddress(value).then((data) => {
        data.complemento = "";
        data.numero = "";
        setAddress(data);
      });

      // Limpa campos de número e complemento
      document.querySelector("#complemento").value = "";
      document.querySelector("#numero").value = "";
    }
  }

  const saveChanges = () => {
    const obj = {};
    obj.PhoneNumber = phone;
    obj.Address = address;
    getIdTokenClaims().then((token) => {
      updateUser(token, obj);
    });
  }

  useEffect(() => {
    if (data) {
      const userData = data[0];
      if (typeof userData === "object") {
        if (userData.hasOwnProperty("PhoneNumber")) {
          const userPhone = userData.PhoneNumber;
          setPhone(maskPhone(userPhone));
        }
        if (userData.hasOwnProperty("Address")) {
          const address = JSON.parse(userData.Address);
          if (address.hasOwnProperty("cep")) {
            const cep = parseInt(address.cep.replace("-", ""));
            document.querySelector("#zipcode").value = cep;
            setAddress(address);
          }
        }
      }
    }
  }, []);

  return (
    <>
      <div className="edit-profile">
        <h3>Editar Perfil</h3>
        <div className="container">
          <div className="item">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.given_name ? user.given_name : ""}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="surname">Sobrenome</label>
            <input
              type="text"
              name="surname"
              id="surname"
              value={user.family_name ? user.family_name : ""}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email ? user.email : ""}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="phone">Número p/ contato</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.currentTarget.value))} />
          </div>
          <div className="item">
            <label>Endereço</label>
            <div className="address">
              <label htmlFor="zipcode">CEP</label>
              <input
                type="number"
                name="zipcode"
                id="zipcode"
                defaultValue=""
                onChange={(e) => handleZipcode(e)}
              />
              <span className={`warning ${address.erro && zipcode !== "" ? "" : "hidden"}`}>
                <IoWarningOutline /> CEP Inválido.
              </span>
              <div className={`container ${address.erro ? "hidden" : ""}`}>
                <Address address={address} setAddress={setAddress} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="save">
        <div className="container">
          <Button initialText="Salvar" newText="Salvo" onClick={() => saveChanges()} />
        </div>
      </div>
    </>
  );
}
