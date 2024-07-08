import { useEffect, useRef, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { Address } from "../address/Address";
import { Button } from "../../../../components/button/Button";
import { useAuth0 } from "@auth0/auth0-react";
import getId from "../../../../scripts/getId";
import getAddress from "../../../../api/getAddress";
import maskPhone from "../../../../scripts/maskPhone";
import updateUser from "../../../../api/updateUser";
import isEmptyObject from "../../../../scripts/isEmptyObject";
import "./EditProfile.css";

export const EditProfile = ({ data, setUser }) => {
  const { user, getIdTokenClaims } = useAuth0();

  // Handle phone number
  const [phone, setPhone] = useState("");
  const phoneRef = useRef(null);

  const handlePhone = (value) => {
    const maskedPhone = maskPhone(value);
    setPhone(maskedPhone);
    if (phoneRef.current.value.length < 15) {
      phoneRef.current.classList.add("warning");
    } else {
      phoneRef.current.classList.remove("warning");
    }
  }

  // Handle address
  const [address, setAddress] = useState({});
  const [zipcode, setZipcode] = useState("");
  const zipcodeRef = useRef(null);
  const zipcodeWarningRef = useRef(null);

  const handleZipcode = (value) => {
    setZipcode(value.substring(0, 8));
    const zipcodeWarning = zipcodeWarningRef.current.classList;

    // Se o CEP for diferente do digitado anterior, atualiza objeto
    if (value.length === 8 && value !== zipcode) {
      getAddress(value).then((data) => {
        // CEP inválido
        if (data.erro) {
          setAddress({});
          zipcodeWarning.add("visible");
          return;
        } else {
          setAddress(data);
          zipcodeWarning.remove("visible");
        }
      });
    } else if (value.length < 8) {
      setAddress({});
      zipcodeWarning.remove("visible");
    }
  }

  // Save changes
  const saveChanges = () => {
    const validAddress = !isEmptyObject(address);
    const validAddressNumber = address?.numero !== "" && address?.numero !== undefined;
    const validPhone = phone.length === 15;

    if (validAddress && validAddressNumber && validPhone) {
      const obj = {
        UserId: getId(user),
        FavoriteProducts: data?.FavoriteProducts,
        PhoneNumber: phoneRef.current.value,
        Address: JSON.stringify(address),
      }
      setUser(obj);
      getIdTokenClaims().then((token) => {
        updateUser(token, { PhoneNumber: phone, Address: address });
      });
    }
  }

  // Load user data
  const loadUserData = (data) => {
    if (data?.hasOwnProperty("Address")) {
      const userAddress = JSON.parse(data.Address);
      setAddress(userAddress);
      const userZipcode = userAddress.cep?.replace("-", "");
      if (userZipcode !== undefined) {
        setZipcode(userZipcode);
      }
    }
    if (data?.hasOwnProperty("PhoneNumber")) {
      const userPhone = data.PhoneNumber;
      setPhone(userPhone);
    }
  }

  useEffect(() => loadUserData(data), []);

  return (
    <>
      <div className="edit-profile">
        <h3>Editar Perfil</h3>
        <div className="container">
          <div className="item">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={user.given_name ? user.given_name : ""}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="surname">Sobrenome</label>
            <input
              type="text"
              id="surname"
              value={user.family_name ? user.family_name : ""}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={user.email ? user.email : ""}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="phone">Número p/ contato</label>
            <input
              type="text"
              id="phone"
              ref={phoneRef}
              value={phone}
              onChange={(e) => handlePhone(e.currentTarget.value)}
            />
          </div>
          <div className="item">
            <label>Endereço</label>
            <div className="address">
              <label htmlFor="zipcode">CEP</label>
              <input
                type="number"
                id="zipcode"
                ref={zipcodeRef}
                value={zipcode}
                onChange={(e) => handleZipcode(e.currentTarget.value)}
              />
              <span className="warning" ref={zipcodeWarningRef}>
                <IoWarningOutline /> CEP Inválido.
              </span>
              <div className="container">
                {!isEmptyObject(address) && <Address address={address} setAddress={setAddress} />}
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
            disabled={(
              address
              && address?.numero !== undefined
              && address?.numero !== ""
              && phone.length === 15
            ) ? "" : "disabled"}
          />
        </div>
      </div>
    </>
  );
}
