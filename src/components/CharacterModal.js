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
            <p style={{ fontSize: "12px" }}>
              <strong>Description:</strong> {character.description}
            </p>

            <p>
              <strong>Species:</strong> {character.race || "Unknown"}
            </p>
            <p>
              <strong>Gender:</strong> {character.gender}
            </p>
            <p>
              <strong>Ki:</strong> {character.ki || "Unknown"}
            </p>
            <p>
              <strong>Affiliation:</strong> {character.affiliation}
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CharacterModal;
