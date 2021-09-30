import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import "../Style/Form.css";
import axios from "axios";

const AñadirForm = (props) => {
  const [nuevoMarca, setNuevoMarca] = useState("");
  const [nuevoModelo, setNuevoModelo] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState("");
  const [nuevoAño, setNuevoAño] = useState("");
  const [files, setFiles] = useState("");
  const handleNuevoImagen = (e) => {
    setFiles(e.target.files);
  };
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

  const handleAñadir = async (e) => {
    const recuperarCoches = props.cochesRecuperar;
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", files[0]);
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + "/upload", formData)
      .then((response) => {
        const imageId = response.data[0].id;
        axios
          .post(process.env.REACT_APP_BACKEND_URL + "/coches", {
            imagen: imageId,
            marca: nuevoMarca,
            modelo: nuevoModelo,
            tipo: nuevoTipo,
            year: nuevoAño,
          })
          .then((response) => {
            console.log(response);
            recuperarCoches();
            toast.success("añadido con exito", {
              position: "top-center",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              transition: Slide,
            });
            setFiles("");
            setNuevoMarca("");
            setNuevoModelo("");
            setNuevoTipo("");
            setNuevoAño("");
          })
          .catch((error) => {
            console.log("error", error);
          });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <form action="" onSubmit={handleAñadir} className="formulario">
        <h2>Añadir Coche</h2>
        <input
          type="file"
          name="image"
          id="imagen"
          onChange={handleNuevoImagen}
          required
        />
        <input
          onChange={handleNuevoMarca}
          value={nuevoMarca}
          type="text"
          name="marca"
          id="marca"
          placeholder="marca del coche"
          required
        />
        <input
          onChange={handleNuevoModelo}
          value={nuevoModelo}
          type="text"
          name="modelo"
          id="modelo"
          placeholder="modelo del coche"
          required
        />
        <input
          onChange={handleNuevoTipo}
          value={nuevoTipo}
          type="text"
          name="tipo"
          id="tipo"
          placeholder="tipo del coche"
          required
        />
        <input
          onChange={handleNuevoAño}
          value={nuevoAño}
          type="number"
          name="año"
          id="año"
          placeholder="año del coche"
          required
          min="2000"
          max="2022"
        />
        <button type="submit">Añadir</button>
      </form>
      <ToastContainer />
    </div>
  );
};
export default AñadirForm;
