import React from "react";
import ElementoBusqueda from "./ElementoBusqueda";
import "./Style/Lista.css";

const ListaBusqueda = (props) => {
  const recuperarCoches = props.cochesRecuperar;
  return (
    <div className="lista-buscada">
      {props.busqueda.map((element) => {
        return (
          <ElementoBusqueda
            key={element.id}
            element={element}
            recuperarCoches={recuperarCoches}
          />
        );
      })}
    </div>
  );
};

export default ListaBusqueda;
