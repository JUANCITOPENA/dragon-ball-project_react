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
