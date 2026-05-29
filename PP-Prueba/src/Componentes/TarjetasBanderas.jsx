function TarjetasBanderas({ bandera, nombre, capital, poblacion }) {
    return (
        <div className="TarjetasBanderas">
            <img src={bandera} alt={nombre}></img>
            <h2>{nombre}</h2>
            <p>Capital: {capital}</p>
            <p>Población: {poblacion}</p>
        </div>
    )
}
export default TarjetasBanderas