import { useState, useEffect } from 'react'
import Busqueda from './busqueda'
import Tarjetas from './Tarjetas'

function apiPokemones() {
    
      const [pokemones, setPokemones] = useState([])
      const [busqueda, setBusqueda] = useState('')
      const [cargando, setCargando] = useState(false)
      const [error, setError] = useState(null)
      
      useEffect(() => {
        const fetchPokemones = async () => {
          try {
            setCargando(true)
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
            if (!response.ok) throw new Error ('Error al obtener los pokemones')
            const data = await response.json()
            setPokemones(data.results)
          } catch (error) {
            console.error('Error:', error)
          } finally {
            setCargando(false)
          }
        }
        fetchPokemones()
      }, [])
    
      if (cargando) {
        return <p>Cargando pokemones...</p>
      }
      if (error) {
        return <p>{error}</p>
      }

      return (
        <>
            <h1>Explorador Pokémon</h1>

            <Busqueda busqueda={busqueda} setBusqueda={setBusqueda} />

            {pokemones.filter(pokemon =>
            pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
            ).length === 0 && <p>No se encontraron pokémon</p>}

            <div className="grilla">
            {pokemones
                .filter(pokemon => pokemon.name.toLowerCase().includes(busqueda.toLowerCase()))
                .map((pokemon) => {
                const id = pokemon.url.split('/').filter(Boolean).pop()
                return (
                    <Tarjetas
                    key={pokemon.name}
                    nombre={pokemon.name}
                    imagen={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    />
                )
                })
            }
            </div>
        </>
      )
}

export default apiPokemones