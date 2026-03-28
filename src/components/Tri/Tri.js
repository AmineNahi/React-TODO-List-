import React, { useContext } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';
import './Tri.css';

const Tri = () => {
    const { sortBy, setSortBy } = useContext(TodoContext);

    return (
        <div className="tri-container">
            <label htmlFor="tri-select" style={{ fontWeight: 'bold', marginRight: '10px' }}>Trier par :</label>
            <select 
                id="tri-select"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="tri-select"
            >
                <option value="ECHEANCE">Date d'échéance</option>
                <option value="CREATION">Date de création</option>
                <option value="NOM">Nom (A-Z)</option>
            </select>
        </div>
    );
};

export default Tri;