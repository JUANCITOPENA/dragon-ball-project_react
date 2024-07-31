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
