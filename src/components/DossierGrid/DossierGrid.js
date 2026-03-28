// src/components/DossierGrid/DossierGrid.js
import React, { useContext } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';
import DossierCard from '../DossierCard/DossierCard';
import './DossierGrid.css';

const DossierGrid = () => {
    const { dossiers } = useContext(TodoContext);

    return (
        <div className="dossier-grid-wrapper">
            <div className="dossier-grid-header">
                <h2 className="dossier-grid-title">Dossiers</h2>
            </div>

            {dossiers.length === 0 ? (
                <div className="dossier-grid-empty">
                    <p>Aucun dossier pour l'instant. Utilisez le bouton + en bas pour en créer un.</p>
                </div>
            ) : (
                <div className="dossier-grid">
                    {dossiers.map(dossier => (
                        <DossierCard key={dossier.id} dossier={dossier} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DossierGrid;