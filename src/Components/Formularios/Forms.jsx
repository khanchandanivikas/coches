import React from "react";
import AñadirForm from "./AñadirForm";
import "../Style/Forms.css";

const Forms = (props) => {
  const cochesRecuperar = props.recuperarCoches;
  return (
    <div className="modificar">
      <AñadirForm cochesRecuperar={cochesRecuperar} />
    </div>
  );
};

export default Forms;
