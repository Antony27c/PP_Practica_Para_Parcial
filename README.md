# PP_Practica_Para_Parcial

Aplicación React que consume dos APIs públicas usando **React + Vite**.

---

## Router

Se utiliza **react-router-dom v7** con `BrowserRouter` en `src/main.jsx:9`.

### Configuración del Router

- **`src/main.jsx`**: El componente `<BrowserRouter>` envuelve toda la app para habilitar el enrutamiento.
- **`src/App.jsx`**: Define las rutas con `<Routes>` y `<Route>`:
  | Ruta | Componente | Descripción |
  |------|-----------|-------------|
  | `/` | `Home` | Página de bienvenida |
  | `/pokemones` | `<Pokemones />` | Página de exploración de Pokémon |
  | `/banderas` | `<Banderas />` | Página de exploración de países |
- **Navegación**: Barra `<nav>` con `<Link>` a cada ruta en `App.jsx:22-26`.

---

## Pages (Páginas)

Las **pages** son wrappers que importan y renderizan los componentes principales de cada sección:

### `src/pages/pokemones.jsx`
Importa y renderiza el componente `<ApiPokemones />`.

### `src/pages/banderas.jsx`
Importa y renderiza el componente `<ApiBanderas />`.

---

## Componentes

### `src/Componentes/apipokemones.jsx`
- **Función**: Obtiene 150 Pokémon desde `https://pokeapi.co/api/v2/pokemon?limit=150`.
- **Estados**: `pokemones`, `busqueda`, `cargando`, `error`.
- **Filtro**: Filtra Pokémon por nombre según el texto de búsqueda.
- **Renderizado**: Muestra una grilla de `<Tarjetas>` con nombre e imagen de cada Pokémon. La imagen se construye extrayendo el ID de la URL de la API: ``https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png``.

### `src/Componentes/ApiBanderas.jsx`
- **Función**: Obtiene países de la región Américas desde `https://restcountries.com/v3.1/region/americas`.
- **Estados**: `paises`, `busqueda`, `cargando`, `error`.
- **Filtro**: Filtra países por nombre común según el texto de búsqueda.
- **Renderizado**: Muestra una grilla de `<TarjetasBanderas>` con bandera, nombre, capital y población.

### `src/Componentes/busqueda.jsx`
- Componente de input reutilizable.
- Props: `busqueda` (valor actual) y `setBusqueda` (función para actualizar).
- Renderiza un `<input>` con clase `buscador`.

### `src/Componentes/Tarjetas.jsx`
- Muestra una tarjeta de Pokémon.
- Props: `nombre`, `imagen`.
- Renderiza: nombre y sprite del Pokémon.

### `src/Componentes/TarjetasBanderas.jsx`
- Muestra una tarjeta de país.
- Props: `bandera`, `nombre`, `capital`, `poblacion`.
- Renderiza: bandera, nombre del país, capital y población.

---

## Consumo de APIs

Ambas APIs se consumen con el patrón **fetch + async/await + useEffect**:

### PokeAPI
- **Endpoint**: `https://pokeapi.co/api/v2/pokemon?limit=150`
- **Método**: `GET`
- **Respuesta**: `{ results: [{ name, url }] }`
- **Imagen**: Se extrae el ID del Pokémon desde la URL y se construye el sprite con `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

### RestCountries API
- **Endpoint**: `https://restcountries.com/v3.1/region/americas`
- **Método**: `GET`
- **Respuesta**: Array de objetos con `name.common`, `flags.svg`, `capital`, `population`, etc.

### Patrón de consumo
```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      setCargando(true)
      const response = await fetch(url)
      if (!response.ok) throw new Error('Error')
      const data = await response.json()
      setDatos(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setCargando(false)
    }
  }
  fetchData()
}, [])
```

Ambos componentes manejan tres estados:
1. **Cargando**: Muestra mensaje mientras se espera la respuesta.
2. **Error**: Muestra el error si la petición falla.
3. **Datos**: Renderiza las tarjetas con los datos obtenidos.

---

## Estructura del proyecto

```
PP-Prueba/
├── index.html                  # Entry point HTML
├── package.json                # Dependencias (react, react-router-dom, vite)
├── vite.config.js              # Configuración de Vite
├── eslint.config.js            # Configuración de ESLint
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.jsx                # Punto de entrada con BrowserRouter
    ├── App.jsx                 # Componente principal con rutas y navegación
    ├── App.css                 # Estilos globales
    ├── index.css               # Estilos base (vacío)
    ├── pages/
    │   ├── banderas.jsx        # Página de banderas
    │   └── pokemones.jsx       # Página de pokemones
    └── Componentes/
        ├── ApiBanderas.jsx     # Lógica de API de países
        ├── apipokemones.jsx    # Lógica de API de Pokémon
        ├── busqueda.jsx        # Input de búsqueda reutilizable
        ├── Tarjetas.jsx        # Tarjeta de Pokémon
        └── TarjetasBanderas.jsx # Tarjeta de país
```
