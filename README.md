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

#### App.js
Este es el componente principal que configura las rutas de la aplicación.

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
Este componente maneja la lógica para mostrar y filtrar personajes.

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
Similar a Characters.js, este componente maneja la lógica para mostrar y filtrar planetas.

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

### Estilos (styles.css)
```css
.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal .modal-content {
  border: none;
  border-radius: 0.5rem;
}

.modal .modal-body {
  padding: 2rem;
}

.modal .modal-body img {
  border-radius: 0.5rem;
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

---

🐉 ¡Disfruta explorando el universo de Dragon Ball con nuestra aplicación! 🌟
