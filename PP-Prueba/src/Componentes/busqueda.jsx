function Busqueda({busqueda, setBusqueda}) {
    return (
            <input
                className="buscador"
                type="text"
                placeholder="Buscando..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
    )
}

export default Busqueda