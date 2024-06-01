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
              name="logradouro"
              id="logradouro"
              value={address.logradouro ? address.logradouro : ""}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="complemento">Complemento</label>
            <input
              type="text"
              name="complemento"
              id="complemento"
              defaultValue={address.complemento ? address.complemento : ""}
              onChange={(e) => {
                const newAddress = address;
                newAddress.complemento = e.target.value;
                setAddress(newAddress);
              }}
            />
          </div>
        </div>
        <div className="item-group">
          <div className="item">
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              name="bairro"
              id="bairro"
              value={address.bairro ? address.bairro : ""}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              name="cidade"
              id="cidade"
              value={address.localidade ? address.localidade : ""}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              name="estado"
              id="estado"
              value={address.uf ? address.uf : ""}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="numero">Número</label>
            <input
              type="number"
              name="numero"
              id="numero"
              defaultValue={address.numero ? address.numero : ""}
              onChange={(e) => {
                const newAddress = address;
                newAddress.numero = e.target.value;
                setAddress(newAddress);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
