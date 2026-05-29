import { useState, useEffect } from 'react'
import TarjetasBanderas from './TarjetasBanderas'
import Busqueda from './busqueda'

function ApiBanderas() {
  const [paises, setPaises] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        setCargando(true)
        const response = await fetch('https://restcountries.com/v3.1/region/americas')
        if (!response.ok) throw new Error('Error al cargar los países')
        const data = await response.json()
        setPaises(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setCargando(false)
      }
    }
    fetchPaises()
  }, [])

  const paisesFiltrados = paises.filter((pais) =>
    pais.name.common.toLowerCase().includes(busqueda.toLowerCase())
  )

  if (cargando) return <p>Cargando países...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>

        <h1>Explorador de Países</h1>
    
      <Busqueda busqueda={busqueda} setBusqueda={setBusqueda} />
        {paisesFiltrados.length === 0 && <p>No se encontraron países</p>}


      <div className="grilla">
        {paisesFiltrados.map((pais) => (
          <TarjetasBanderas
            key={pais.cca3}
            nombre={pais.name.common}
            bandera={pais.flags.svg}
            capital={pais.capital?.[0]}
            poblacion={pais.population}
          />
        ))}
      </div>
    </>
  )
}

export default ApiBanderas