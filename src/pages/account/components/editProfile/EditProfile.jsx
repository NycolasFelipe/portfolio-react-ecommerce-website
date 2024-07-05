import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import getAddress from "../../../../api/getAddress";
import maskPhone from "../../../../scripts/maskPhone";
import { Address } from "../address/Address";
import { Button } from "../../../../components/button/Button";
import { useAuth0 } from "@auth0/auth0-react";
import updateUser from "../../../../api/updateUser";
import "./EditProfile.css";

export const EditProfile = ({ data, setUser }) => {
  const { user, getIdTokenClaims } = useAuth0();
  const [address, setAddress] = useState({ erro: true });
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");

  function displayAddress(active) {
    if (active) {
      // Exibe campos de endereço
      document.querySelector(".address .container").classList.remove("hidden");
    } else {
      // Limpa campos de endereço
      document.querySelector("#logradouro").value = "";
      document.querySelector("#complemento").value = "";
      document.querySelector("#bairro").value = "";
      document.querySelector("#cidade").value = "";
      document.querySelector("#estado").value = "";
      document.querySelector("#numero").value = "";

      // Esconde campo de endereços
      document.querySelector(".address .container").classList.add("hidden");
    }
  }

  function displayWarning(active) {
    if (active) {
      document.querySelector(".address .warning").classList.remove("hidden");
    } else {
      document.querySelector(".address .warning").classList.add("hidden");
    }
  }

  function fillAddress(address) {
    document.querySelector("#zipcode").value = parseInt(address.cep);
    document.querySelector("#logradouro").value = address.logradouro;
    document.querySelector("#complemento").value = address.complemento;
    document.querySelector("#bairro").value = address.bairro;
    document.querySelector("#cidade").value = address.cidade;
    document.querySelector("#estado").value = address.estado;
    document.querySelector("#numero").value = address.numero;
  }

  function fillPhone(phone) {
    document.querySelector("#phone").value = phone;
  }

  const handleZipcode = (e) => {
    // Limita 8 digitos iniciais
    const value = e.currentTarget.value.substring(0, 8);
    e.currentTarget.value = value;

    // Se o CEP for diferente do digitado anterior, atualiza objeto
    if (value.length === 8 && value !== zipcode) {
      getAddress(value).then((data) => {
        // CEP inválido
        if (data.erro) {
          displayAddress(false);
          return null;
        }
        // CEP válido
        displayAddress(true);
        displayWarning(false);
        setAddress(data);
        setZipcode(value);
      });
    } else if (value.length < 8) {
      setZipcode("");
      displayAddress(false);
      displayWarning(true);
    }
  }

  const saveChanges = () => {
    const validZipcode = zipcode.length > 0;
    const validPhone = phone.length === 15;

    if (validZipcode && validPhone) {
      const userId = user.sub.replace("google-oauth2|", "").replace("auth0|", "");
      const obj = {
        UserId: userId,
        PhoneNumber: phone,
        Address: JSON.stringify(address)
      }
      setUser([obj]);
      getIdTokenClaims().then((token) => {
        updateUser(token, { PhoneNumber: phone, Address: address });
      });
    }
  }

  useEffect(() => {
    if (data) {
      const userData = data[0];

      if (userData !== undefined) {
        try {
          if (typeof userData.PhoneNumber !== "undefined") {
            const phoneNumber = userData.PhoneNumber;
            setPhone(phoneNumber);

            if (phoneNumber.length > 0) {
              fillPhone(phoneNumber);
            }
          }

          if (userData.Address !== undefined) {
            const address = JSON.parse(userData.Address);
            if (typeof address.cep !== "undefined") {
              address.cep = address.cep.replace("-", "");
              const cep = address.cep;
              setZipcode(cep);
            }
            setAddress(address);

            if (address.hasOwnProperty("cep")) {
              fillAddress(address);
              displayWarning(false);
            }
          }
        } catch (err) {
          console.debug(err);
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
              className={phone.length === 15 ? "" : "warning"}
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
              <span className="warning">
                <IoWarningOutline /> CEP Inválido.
              </span>
              <div className="container">
                <Address address={address} setAddress={setAddress} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="save">
        <div className="container">
          <Button
            initialText="Salvar"
            newText="Salvo"
            onClick={() => saveChanges()}
            disabled={(zipcode.length > 0 && phone.length === 15) ? "" : "disabled"}
          />
        </div>
      </div>
    </>
  );
}
