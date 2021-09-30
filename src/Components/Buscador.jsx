import React from "react";
import { useState } from "react";
import ListaBusqueda from "./ListaBusqueda";
import "./Style/Buscador.css";

const Buscador = (props) => {
  const cochesRecuperar = props.recuperarCoches;
  const [busqueda, setBusqueda] = useState([]);
  const [nuevoBuscar, setNuevoBuscar] = useState("");
  const [nuevoValor, setNuevoValor] = useState("");
  const handleNuevoBuscar = (e) => {
    setNuevoBuscar(e.target.value);
  };
  const handleNuevoValor = (e) => {
    setNuevoValor(e.target.value);
  };
  const handleBuscar = async (e) => {
    e.preventDefault();
    const recuperarBusqueda = async () => {
      try {
        const request = await fetch(
          process.env.REACT_APP_BACKEND_URL +
            `/coches?${nuevoBuscar}=${nuevoValor}`
        );
        const data = await request.json();
        setBusqueda(data);
        setNuevoBuscar("");
        setNuevoValor("");
        console.log(busqueda);
      } catch (error) {
        console.log("error", error);
      }
    };
    recuperarBusqueda();
  };
  return (
    <div className="buscar">
      <form action="" onSubmit={handleBuscar} className="form-buscar">
        <select
          name="buscar"
          id="buscar"
          value={nuevoBuscar}
          onChange={handleNuevoBuscar}
        >
          <option value="">Buscar por:</option>
          <option value="marca">marca</option>
          <option value="modelo">modelo</option>
          <option value="tipo">tipo</option>
          <option value="year">año</option>
        </select>
        <input
          type="text"
          name="valor"
          id="valor"
          value={nuevoValor}
          onChange={handleNuevoValor}
          placeholder="nombre del propiedad"
        />
        <button type="submit">Buscar</button>
      </form>
      <ListaBusqueda
        key={busqueda.id}
        busqueda={busqueda}
        cochesRecuperar={cochesRecuperar}
      />
    </div>
  );
};

export default Buscador;
