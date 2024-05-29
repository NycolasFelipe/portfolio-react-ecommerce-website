import "./Address.css";

export const Address = ({ address, setAddress }) => {
  return (
    <div className="address-field" onClick={() => console.log(address)}>
      <div className="container">
        <div className="item-group">
          <div className="item">
            <label htmlFor="logradouro">Logradouro</label>
            <input
              type="text"
              name="logradouro"
              id="logradouro"
              value={address?.logradouro}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="complemento">Complemento</label>
            <input
              type="text"
              name="complemento"
              id="complemento"
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
              value={address?.bairro}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              name="cidade"
              id="cidade"
              value={address?.localidade}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              name="estado"
              id="estado"
              value={address?.uf}
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="numero">Número</label>
            <input
              type="number"
              name="numero"
              id="numero"
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
}