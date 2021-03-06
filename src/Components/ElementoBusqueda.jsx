import React from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import ModificarCoche from "./Formularios/ModificarCoche";
import "./Style/Card.css";

const ElementoBusqueda = (props) => {
  const coche = props.element;
  const [nuevoEliminar, setNuevoEliminar] = useState(coche.id);
  const [modalCocheModificar, setModalCocheModificar] = useState(false);
  const toggleModificarCoche = () => {
    setModalCocheModificar(!modalCocheModificar);
  };
  const handleNuevoEliminar = () => {
    setNuevoEliminar(coche.id);
  };
  const recuperarCoches = props.recuperarCoches;
  const handleEliminar = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Estas seguro?",
      text: "No puedes revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(process.env.REACT_APP_BACKEND_URL + `/coches/${nuevoEliminar}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((request) => {
            request.json();
            recuperarCoches();
            Swal.fire("Eliminado!", "Este dato ha sido eliminado.", "success");
          })
          .catch((error) => {
            console.log("error" + error);
          });
      }
    });
  };
  return (
    <div className="card">
      <img
        src={coche.imagen}
        alt="coches"
      />
      <div className="card-content">
        <h3>Marca: <span>{coche.marca}</span></h3>
        <h3>Modelo: <span>{coche.modelo}</span></h3>
        <h3>Tipo: <span>{coche.tipo}</span></h3>
        <h3>Año: <span>{coche.year}</span></h3>
        <button
          onClick={handleEliminar}
          value={nuevoEliminar}
          onChange={handleNuevoEliminar}
        >
          Eliminar
        </button>
        <button onClick={toggleModificarCoche}>Modificar</button>
        {modalCocheModificar ? (
          <ModificarCoche
            coche={coche}
            toggleModificarCoche={toggleModificarCoche}
            recuperarCoches={recuperarCoches}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ElementoBusqueda;
