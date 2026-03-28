import React, { useState, useContext } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';
import { ETATS } from '../../data/constants';
import './ModalForm.css';

const ModalForm = () => {
    const { isModalOpen, setIsModalOpen, addTask } = useContext(TodoContext);

    // États locaux pour les champs du formulaire
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateEcheance, setDateEcheance] = useState('');
    const [etat, setEtat] = useState(ETATS.NOUVEAU);
    const [erreur, setErreur] = useState('');

    // Si la modale est fermée, on ne renvoie rien (null)
    if (!isModalOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Validation métier (Cahier des charges)
        if (title.length < 5) {
            setErreur("L'intitulé doit faire au moins 5 caractères.");
            return;
        }
        if (!dateEcheance) {
            setErreur("La date d'échéance est obligatoire.");
            return;
        }

        // Construction de l'objet Tâche
        const nouvelleTache = {
            title,
            description,
            date_creation: new Date().toISOString().split('T')[0], // Date du jour (YYYY-MM-DD)
            date_echeance: dateEcheance,
            etat,
            equipiers: [] // Vide par défaut pour simplifier
        };

        addTask(nouvelleTache);

        // Reset du formulaire
        setTitle('');
        setDescription('');
        setDateEcheance('');
        setEtat(ETATS.NOUVEAU);
        setErreur('');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Nouvelle Tâche</h2>
                {erreur && <p style={{ color: 'red', fontSize: '0.9rem' }}>{erreur}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Intitulé (min 5 car.) *</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Date échéance *</label>
                        <input type="date" value={dateEcheance} onChange={(e) => setDateEcheance(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Statut</label>
                        <select value={etat} onChange={(e) => setEtat(e.target.value)}>
                            {Object.values(ETATS).map(statut => (
                                <option key={statut} value={statut}>{statut}</option>
                            ))}
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">Annuler</button>
                        <button type="submit" className="btn-submit">Créer la tâche</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;