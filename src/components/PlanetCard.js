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
