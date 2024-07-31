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

  // const handleClear = () => {
  //   setFilteredCharacters(characters);
  //   setCurrentPage(1);
  // };

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
            {/* <button className="btn btn-secondary" onClick={handleClear}>Clear</button> */}
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
