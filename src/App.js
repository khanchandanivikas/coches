import "./App.css";
import { useState, useEffect } from "react";
import ListaCoches from "./Components/ListaCoches";
import Forms from "./Components/Formularios/Forms";
import Buscador from "./Components/Buscador";

function App() {
  const [coches, setCoches] = useState([]);
  const recuperarCoches = async () => {
    try {
      const request = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/coches"
      );
      const datos = await request.json();
      console.log(datos);
      setCoches(datos);
    } catch (error) {
      console.log("error" + error);
    }
  };
  useEffect(() => {
    recuperarCoches();
  }, []);
  return (
    <div className="App">
      <h1>Autos Fast & Furious</h1>
      <Forms recuperarCoches={recuperarCoches} />
      <Buscador recuperarCoches={recuperarCoches} />
      <ListaCoches
        key={coches.id}
        coches={coches}
        recuperarCoches={recuperarCoches}
      />
    </div>
  );
}

export default App;
