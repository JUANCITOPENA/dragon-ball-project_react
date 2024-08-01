# 🐉 Proyecto Dragon Ball API con React

## Introducción

Este proyecto es una aplicación web interactiva que muestra información sobre los personajes y planetas del universo Dragon Ball. Utilizando la API pública de Dragon Ball, este proyecto ofrece una interfaz amigable para explorar y conocer más sobre este fascinante mundo.

La aplicación permite a los usuarios:
- 🔍 Buscar personajes y planetas
- 👀 Ver detalles de cada personaje y planeta
- 🖼️ Disfrutar de imágenes de alta calidad
- 📱 Navegar fácilmente con una interfaz responsiva

Este proyecto no solo es una fuente de entretenimiento para los fans de Dragon Ball, sino también un excelente ejemplo de cómo construir una aplicación web moderna con React.

## 🛠️ Tecnologías Utilizadas

- **React** ⚛️: Biblioteca de JavaScript para construir interfaces de usuario.
- **React Router** 🛣️: Enrutamiento declarativo para aplicaciones React.
- **Bootstrap** 🎨: Framework CSS para diseño responsivo.
- **API de Dragon Ball** 🌐: Fuente de datos para personajes y planetas.

## 📥 Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/dragon-ball-project.git
   ```

2. Navega al directorio del proyecto:
   ```
   cd dragon-ball-project
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

4. Instala las dependencias adicionales:
   ```
   npm install react-router-dom bootstrap
   ```

## 🚀 Uso

Para iniciar la aplicación en modo de desarrollo:

```
npm start
```

La aplicación se abrirá automáticamente en tu navegador predeterminado. Si no, visita `http://localhost:3000`.

Para construir la aplicación para producción:

```
npm run build
```

Para ejecutar las pruebas:

```
npm test
```

## 💻 Código

### Estructura del Proyecto

```
dragon-ball-project
│
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── CharacterCard.js
│   │   ├── CharacterModal.js
│   │   ├── PlanetCard.js
│   │   ├── PlanetModal.js
│   │   └── Pagination.js
│   ├── pages
│   │   ├── Characters.js
│   │   └── Planets.js
│   ├── App.js
│   ├── index.js
│   └── styles.css
└── package.json
```

### Componentes Principales

### public/index.html:

Este archivo HTML define la estructura básica de una página web para un proyecto llamado "Dragon Ball Project API". Incluye:

La configuración de la codificación y el viewport.
El título de la página.
Los enlaces a los estilos de Bootstrap y un archivo CSS local.
Un contenedor div con el ID root para insertar contenido dinámico.
La inclusión del script de Bootstrap para funcionalidades interactivas.

### public/index.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dragon Ball Project API</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="%PUBLIC_URL%/styles.css">
</head>
<body>
    <div id="root"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### src/index.js:

Este archivo JavaScript es el punto de entrada de una aplicación React. Hace lo siguiente:

- Importa las bibliotecas necesarias: React, ReactDOM, un archivo CSS local, la aplicación principal (App), y los estilos de Bootstrap.
- Busca el elemento con el ID `root` en el HTML.
- Renderiza el componente `App` dentro del `React.StrictMode` en el elemento `root`.


### src/index.js:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```


#### App.js

Este es el componente principal que configura las rutas de la aplicación.

- **Importa**: React, `BrowserRouter` como `Router`, `Route`, y `Routes` desde `react-router-dom`, además de los componentes `Characters` y `Planets` desde el directorio `pages`.
- **Define**: Un componente funcional `App` que:
  - Utiliza `Router` para gestionar las rutas.
  - Renderiza una estructura con un contenedor `div` que aplica un margen superior (`mt-5`).
  - Configura las rutas de la aplicación con `Routes`:
    - La ruta raíz (`/`) muestra el componente `Characters`.
    - La ruta `/planets` muestra el componente `Planets`.
- **Exporta**: El componente `App` como el exportable por defecto.

### src/App.js:

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Characters from './pages/Characters';
import Planets from './pages/Planets';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/planets" element={<Planets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

#### Characters.js

Este componente maneja la visualización y filtrado de personajes:

- **Estados**: Administra personajes, filtrados, página actual, carga, y errores.
- **Efecto**: Obtiene datos de personajes desde una API al montar el componente.
- **Filtrado**: Permite buscar personajes por nombre y actualiza la lista filtrada.
- **Paginación**: Muestra una página de personajes y maneja la paginación.
- **Renderiza**: 
  - Un título y campo de búsqueda.
  - Mensajes de carga o error según el estado.
  - Tarjetas de personajes, paginación y un modal para detalles del personaje seleccionado.

#### Characters.js:

```javascript
import React, { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import CharacterModal from '../components/CharacterModal';
import Pagination from '../components/Pagination';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dragonball-api.com/api/characters?limit=1000');
      const data = await response.json();
      setCharacters(data.items);
      setFilteredCharacters(data.items);
    } catch (error) {
      setError('Error fetching characters');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = characters.filter(character => character.name.toLowerCase().includes(query));
    setFilteredCharacters(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h1 className="text-center mb-4">🐲Dragon Ball Characters 🌍</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search characters by name" onChange={handleSearch} />
            <a href="/planets" className="btn btn-success ms-2">View Planets</a>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-4 g-4 mb-4">
            {currentCharacters.map(character => (
              <CharacterCard key={character.id} character={character} setSelectedCharacter={setSelectedCharacter} />
            ))}
          </div>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredCharacters.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {selectedCharacter && (
            <CharacterModal character={selectedCharacter} setSelectedCharacter={setSelectedCharacter} />
          )}
        </>
      )}
    </div>
  );
}

export default Characters;
```


#### Planets.js
Este componente maneja la visualización y filtrado de planetas:

- **Estados**: Administra planetas, filtrados, página actual, carga, y errores.
- **Efecto**: Obtiene datos de planetas desde una API al montar el componente.
- **Filtrado**: Permite buscar planetas por nombre y actualiza la lista filtrada.
- **Limpieza**: Resetea la lista filtrada a la lista original.
- **Paginación**: Muestra una página de planetas y maneja la paginación.
- **Renderiza**: 
  - Un título y campo de búsqueda con botones para limpiar y cambiar de vista.
  - Mensajes de carga o error según el estado.
  - Tarjetas de planetas, paginación y un modal para detalles del planeta seleccionado.

#### Planets.js

```javascript
import React, { useState, useEffect } from 'react';
import PlanetCard from '../components/PlanetCard';
import PlanetModal from '../components/PlanetModal';
import Pagination from '../components/Pagination';

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dragonball-api.com/api/planets?limit=1000');
      const data = await response.json();
      setPlanets(data.items);
      setFilteredPlanets(data.items);
    } catch (error) {
      setError('Error fetching planets');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = planets.filter(planet => planet.name.toLowerCase().includes(query));
    setFilteredPlanets(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilteredPlanets(planets);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlanets = filteredPlanets.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h1 className="text-center mb-4">🐲 Dragon Ball Planets 🌍</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search planets by name" onChange={handleSearch} />
            <button className="btn btn-secondary" onClick={handleClear}>Clear</button>
            <a href="/" className="btn btn-danger ms-2">View Characters</a>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
            {currentPlanets.map(planet => (
              <PlanetCard key={planet.id} planet={planet} setSelectedPlanet={setSelectedPlanet} />
            ))}
          </div>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredPlanets.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {selectedPlanet && (
            <PlanetModal planet={selectedPlanet} setSelectedPlanet={setSelectedPlanet} />
          )}
        </>
      )}
    </div>
  );
}

export default Planets;
```

### Componentes Auxiliares

#### CharacterCard.js

Este componente muestra una tarjeta de personaje:

- **Propiedades**: 
  - `character`: Datos del personaje.
  - `setSelectedCharacter`: Función para seleccionar el personaje.
- **Renderiza**:
  - Una tarjeta (`card`) con una imagen del personaje.
  - Nombre del personaje en el título de la tarjeta.
  - Un botón para ver detalles, que activa la función `setSelectedCharacter` con el personaje correspondiente.


#### CharacterCard.js
```javascript
import React from 'react';

function CharacterCard({ character, setSelectedCharacter }) {
  return (
    <div className="col">
      <div className="card h-100 shadow">
        <img src={character.image} className="card-img-top" alt={character.name} />
        <div className="card-body">
          <h5 className="card-title">{character.name}</h5>
          <button className="btn btn-primary" onClick={() => setSelectedCharacter(character)}>View Details</button>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
```

#### CharacterModal.js

Este componente muestra un modal con detalles del personaje:

- **Propiedades**:
  - `character`: Datos del personaje.
  - `setSelectedCharacter`: Función para cerrar el modal.
- **Renderiza**:
  - Un modal centrado que se muestra siempre (`show={true}`).
  - Imagen del personaje y detalles como nombre, descripción, especie, género, ki, y afiliación.
  - Un botón para cerrar el modal llamando a `setSelectedCharacter` con `null`.

#### CharacterModal.js
```javascript
import React from 'react';
import Modal from 'react-bootstrap/Modal';

function CharacterModal({ character, setSelectedCharacter }) {
  return (
    <Modal show={true} onHide={() => setSelectedCharacter(null)} centered>
      <Modal.Body>
        <div className="d-flex">
          <img
            src={character.image}
            alt={character.name}
            className="me-3"
            style={{ width: "150px", height: "350px" }}
          />
          <div className="text-center">
            <h5>{character.name}</h5>
            <p style={{ fontSize: "12px" }}><strong>Description:</strong> {character.description}</p>
            <p><strong>Species:</strong> {character.race || "Unknown"}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Ki:</strong> {character.ki || "Unknown"}</p>
            <p><strong>Affiliation:</strong> {character.affiliation}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CharacterModal;
```


#### PlanetCard.js

Este componente muestra una tarjeta de planeta:

- **Propiedades**:
  - `planet`: Datos del planeta.
  - `setSelectedPlanet`: Función para seleccionar el planeta.
- **Renderiza**:
  - Una tarjeta (`card`) con una imagen del planeta.
  - Nombre del planeta en el título de la tarjeta.
  - Un botón para ver detalles, que activa la función `setSelectedPlanet` con el planeta correspondiente.

#### PlanetCard.js
```javascript
import React from 'react';

function PlanetCard({ planet, setSelectedPlanet }) {
  return (
    <div className="col">
      <div className="card h-100 shadow">
        <img src={planet.image} className="card-img-top" alt={planet.name} />
        <div className="card-body">
          <h5 className="card-title">{planet.name}</h5>
          <button className="btn btn-primary" onClick={() => setSelectedPlanet(planet)}>View Details</button>
        </div>
      </div>
    </div>
  );
}

export default PlanetCard;
```

#### PlanetModal.js

Este componente muestra un modal con detalles del planeta:

- **Propiedades**:
  - `planet`: Datos del planeta.
  - `setSelectedPlanet`: Función para cerrar el modal.
- **Renderiza**:
  - Un modal centrado que se muestra siempre (`show={true}`).
  - Imagen del planeta y detalles como nombre, descripción y si el planeta está destruido.
  - Un botón para cerrar el modal llamando a `setSelectedPlanet` con `null`.


#### PlanetModal.js
```javascript
import React from 'react';
import Modal from 'react-bootstrap/Modal';

function PlanetModal({ planet, setSelectedPlanet }) {
  return (
    <Modal show={true} onHide={() => setSelectedPlanet(null)} centered>
      <Modal.Body>
        <div className="d-flex">
          <img src={planet.image} alt={planet.name} className="me-3" style={{ width: '200px', height: 'auto' }} />
          <div className="text-center">
            <h5>{planet.name}</h5>
            <p><strong>Description:</strong> {planet.description}</p>
            <p><strong>Destroyed:</strong> {planet.destroyed ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PlanetModal;
```

#### Pagination.js

Este componente maneja la paginación:

- **Propiedades**:
  - `itemsPerPage`: Número de ítems por página.
  - `totalItems`: Total de ítems a paginar.
  - `currentPage`: Página actual.
  - `setCurrentPage`: Función para actualizar la página actual.
- **Renderiza**:
  - Una lista de números de página basada en el total de ítems y los ítems por página.
  - Cada número de página es un botón que actualiza la página actual al hacer clic.
  - Resalta el número de la página actual.


#### Pagination.js
```javascript
import React from 'react';

function Pagination({ itemsPerPage, totalItems, currentPage, setCurrentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button onClick={() => setCurrentPage(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
```
### Descripción del CSS

- **`body`**: Aplica un gradiente animado como fondo, con un ciclo de animación de 12 segundos.
- **`@keyframes gradientAnimation`**: Define la animación del gradiente de fondo, cambiando su posición.
- **`@keyframes fluorescence`**: Anima el efecto de resplandor en el texto de los encabezados (`h1`).
- **`h1`**: Estilo para los encabezados principales, con un color de texto y animación de fluorescencia.
- **`h5`**: Estilo para los subtítulos, centrados y en color azul.
- **`p`**: Centra el texto en los párrafos.
- **`.card`**: Estilo para tarjetas, con un efecto de escala al pasar el cursor.
- **`.card-img-top`**: Ajusta la imagen en la parte superior de la tarjeta, con un fondo blanco.
- **`.card-body`**: Centra el contenido de la tarjeta.
- **`.text-center`**: Centra el texto en el contenedor del botón.
- **`button`**: Ajusta el estilo del botón, con padding y centramiento.
- **`.modal-dialog`**: Define un ancho máximo para los diálogos del modal.
- **`.modal-body .row`**: Centra el contenido en el cuerpo del modal.
- **`.modal-footer`**: Centra el contenido del pie del modal.
- **`.btn-primary`**: Centra el botón primario horizontalmente en el pie del modal.


### Estilos (styles.css)
```css
body {
    margin: 0;
    height: 100vh;
    background: linear-gradient(45deg, #FF4500, #d4e16d, #FF8C00, #FFD700, #00BFFF, #023d78);
    background-size: 600% 600%;
    animation: gradientAnimation 12s ease infinite;
}

@keyframes gradientAnimation {
    0% {
        background-position: 0% 0%;
    }
    25% {
        background-position: 100% 0%;
    }
    50% {
        background-position: 100% 100%;
    }
    75% {
        background-position: 0% 100%;
    }
    100% {
        background-position: 0% 0%;
    }
}

/* H1*/

@keyframes fluorescence {
    0% {
        text-shadow: 0 0 5px rgba(255, 0, 0, 0.8), 0 0 10px rgba(255, 0, 0, 0.6), 0 0 15px rgba(255, 0, 0, 0.4);
    }
    50% {
        text-shadow: 0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.6), 0 0 30px rgba(0, 255, 0, 0.4);
    }
    100% {
        text-shadow: 0 0 5px rgba(0, 0, 255, 0.8), 0 0 10px rgba(0, 0, 255, 0.6), 0 0 15px rgba(0, 0, 255, 0.4);
    }
}

h1 {
    color: rgb(2, 2, 45);
    font-size: 3rem; /* Tamaño del texto */
    font-weight: bold;
    text-align: center;
    animation: fluorescence 2s infinite; /* Aplicar la animación de fluorescencia */
}

h5 {
    text-align: center;
    font-weight: bold;
    color: blue;
}

p {
    text-align: center;
}

.card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s;
}

.card-img-top {
    width: 100%;
    height: 300px;
    object-fit: contain;
    background-color: #f8f9fa;
}

.card-body {
    display: flex;
    flex-direction: column;
    align-items: center; /* Centra los elementos horizontalmente */
    text-align: center; /* Centra el texto dentro de la tarjeta */
}

.card:hover {
    transform: scale(1.05);
}

.text-center {
    text-align: center; /* Centra el texto dentro del contenedor del botón */
}

button {
    margin: 0;
    padding: 10px 20px; /* Ajusta el padding según sea necesario */
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-dialog {
    max-width: 800px;
}

.modal-body .row {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-body .col-md-8 {
    text-align: center;
}
 
.modal-footer {
    display: flex;
    justify-content: center; /* Centra el contenido horizontalmente */
    align-items: center; /* Centra el contenido verticalmente */
}

.btn-primary {
    margin: 0 auto; /* Centra el botón horizontalmente */
}

```

## 🤝 Contribuciones

Las contribuciones son bienvenidas y apreciadas. Para contribuir:

1. 🍴 Haz un fork del repositorio.
2. 🌿 Crea una nueva rama (`git checkout -b feature/AmazingFeature`).
3. 💻 Haz tus cambios y commitea (`git commit -m 'Add some AmazingFeature'`).
5. 4. 📤 Haz push a la rama (`git push origin feature/AmazingFeature`).
5. 🔄 Abre un Pull Request.

Por favor, asegúrate de actualizar las pruebas según corresponda y de seguir el estilo de código del proyecto.

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 🚀 Áreas de Mejora

Aunque este proyecto ya es funcional, hay varias áreas en las que se podría mejorar:

1. 🛠️ **Manejo de Errores**: Implementar un manejo de errores más robusto para las llamadas a la API.
2. ⏳ **Estados de Carga**: Añadir indicadores de carga más detallados mientras se obtienen los datos.
3. 🚪 **Cierre de Modal**: Agregar un botón de cierre explícito a los modales para mejorar la experiencia del usuario.
4. 📱 **Diseño Responsivo**: Asegurar que todos los componentes sean completamente responsivos en diferentes tamaños de pantalla.
5. 🔄 **Duplicación de Código**: Considerar la creación de un servicio de API compartido para reducir la duplicación en `Characters.js` y `Planets.js`.
6. ✅ **Comprobación de Tipos**: Considerar añadir PropTypes o TypeScript para una mejor comprobación de tipos y prevención de errores.
7. 🌐 **Internacionalización**: Implementar soporte para múltiples idiomas para hacer la aplicación accesible a una audiencia más amplia.
8. 🎨 **Temas**: Añadir soporte para temas claro y oscuro para mejorar la experiencia del usuario en diferentes condiciones de iluminación.

## 📚 Recursos Adicionales

- [Documentación de React](https://reactjs.org/docs/getting-started.html)
- [Documentación de React Router](https://reactrouter.com/web/guides/quick-start)
- [Documentación de Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
- [Dragon Ball API Documentation](https://dragonball-api.com/documentation) (ficticia, reemplazar con la documentación real si existe)

## 📞 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o contactar al mantenedor del proyecto:

👤 [JUANCITO PEÑA](https://github.com/JUANCITOPENA)

No olvides suscribirte, darle like, y compartir este video para ayudarnos a seguir creando contenido como este. ¡Vamos a comenzar! 😊📡

#RedesCisco #ProyectoDeRedes #CiscoPacketTracer 🌐💻📡

1. 🎬 **YouTube**: [@JuancitoPenaV](https://www.youtube.com/@JuancitoPenaV)
2. 👨‍💼 **LinkedIn**: [Juancito Peña](https://www.linkedin.com/in/juancitope%C3%B1a/)
3. 📷 **Instagram**: [@juancito.pena.v](https://www.instagram.com/juancito.pena.v/)
4. 📑 **Facebook**: [Juancito Peña V](https://www.facebook.com/juancito.p.v)
5. 🐦 **Twitter**: [@JuancitoPenaV](https://twitter.com/JuancitoPenaV)
6. 📰 **Blog**: [Adviser Tecnology](https://advisertecnology.com/)

---

🐉 ¡Disfruta explorando el universo de Dragon Ball con nuestra aplicación! 🌟
