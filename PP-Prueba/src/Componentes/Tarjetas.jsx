function Tarjetas({nombre, imagen}) {
    return (
        <div className="TarjetasPokem">
            <h2>{nombre}</h2>
            <img src={imagen} alt={nombre} />
        </div>
    )
}
export default Tarjetas