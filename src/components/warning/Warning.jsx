import React from "react";
import { WarningCard } from "../warningCard/WarningCard";
import "./Warning.css";

export const Warning = ({ warning }) => {
  const error = {
    login: {
      title: "Erro na conexão.",
      message: "Não foi possível obter dados do usuário."
    }
  }

  return (
    <>
      {
        warning && (
          <div className="warning_container" title="Recarregar página" onClick={() => window.location.reload()}>
            <WarningCard title={error.login.title} message={error.login.message} />
          </div>
        )
      }
    </>
  );
}
