import { Routes, Route, Link } from 'react-router-dom'
import Pokemones from './pages/pokemones'
import Banderas from './pages/banderas'
import './App.css'

function Home() {
  return (
    <div className="home">
      <h1>Bienvenido</h1>
      <p>
        Esta página consume dos APIs públicas:<br />
        <strong>/pokemones</strong> — Información de Pokémon desde la PokeAPI.<br />
        <strong>/banderas</strong> — Datos de países y sus banderas desde la API RestCountries.
      </p>
    </div>
  )
}

function App() {
  return (
    <>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/pokemones">Pokemones</Link>
        <Link to="/banderas">Banderas</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemones" element={<Pokemones />} />
        <Route path="/banderas" element={<Banderas />} />
      </Routes>
    </>
  )
}

export default App
