import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";

const ModificarCoche = (props) => {
  const setClose = props.toggleModificarCoche;
  const handleModal = () => {
    setClose();
  };
  const cocheElegido = props.coche;
  const [nuevoMarca, setNuevoMarca] = useState(cocheElegido.marca);
  const [nuevoModelo, setNuevoModelo] = useState(cocheElegido.modelo);
  const [nuevoTipo, setNuevoTipo] = useState(cocheElegido.tipo);
  const [nuevoAño, setNuevoAño] = useState(cocheElegido.year);
  const handleNuevoMarca = (e) => {
    setNuevoMarca(e.target.value);
  };
  const handleNuevoModelo = (e) => {
    setNuevoModelo(e.target.value);
  };
  const handleNuevoTipo = (e) => {
    setNuevoTipo(e.target.value);
  };
  const handleNuevoAño = (e) => {
    setNuevoAño(e.target.value);
  };
  var data = {
    marca: nuevoMarca,
    modelo: nuevoModelo,
    tipo: nuevoTipo,
    year: nuevoAño,
  };
  const handleModificar = async (e) => {
    const cochesRecuperar = props.recuperarCoches;
    e.preventDefault();
    await fetch(
      process.env.REACT_APP_BACKEND_URL + `/coches/${cocheElegido.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((request) => {
        request.json();
      })
      .then((data) => {
        console.log(data);
        cochesRecuperar();
        toast.success("modificado con exito", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          transition: Slide,
        });
        setClose();
      })
      .catch((error) => {
        console.log("error" + error);
      });
  };
  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="form-container">
        <form action="" onSubmit={handleModificar} className="formulario2">
          <h2>Modificar Coche</h2>
          <input
            onChange={handleNuevoMarca}
            value={nuevoMarca}
            type="text"
            name="marca"
            id="marca"
            placeholder="marca nuevo o existente"
            required
          />
          <input
            onChange={handleNuevoModelo}
            value={nuevoModelo}
            type="text"
            name="modelo"
            id="modelo"
            placeholder="modelo nuevo o existente"
            required
          />
          <input
            onChange={handleNuevoTipo}
            value={nuevoTipo}
            type="text"
            name="tipo"
            id="tipo"
            placeholder="tipo nuevo o existente"
            required
          />
          <input
            onChange={handleNuevoAño}
            value={nuevoAño}
            type="number"
            name="año"
            id="año"
            placeholder="año nuevo o existente"
            min="2000"
            max="2022"
            required
          />
          <button type="submit">Modificar</button>
          <button onClick={handleModal}>Cerrar</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ModificarCoche;
