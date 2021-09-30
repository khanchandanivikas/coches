import React from "react";
import ElementoCoches from "./ElementoCoches";
import "./Style/Lista.css";

const ListaCoches = (props) => {
  const cochesRecuperar = props.recuperarCoches;
  return (
    <div className="lista">
      {props.coches.map((element) => {
        return (
          <ElementoCoches
            key={element.id}
            element={element}
            cochesRecuperar={cochesRecuperar}
          />
        );
      })}
    </div>
  );
};

export default ListaCoches;
