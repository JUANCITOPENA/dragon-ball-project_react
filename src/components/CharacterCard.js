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
