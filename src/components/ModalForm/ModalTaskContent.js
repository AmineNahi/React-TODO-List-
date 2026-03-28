import React, { useState, useContext } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';

const ModalTaskContent = () => {
    const { addTask } = useContext(TodoContext);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [equipiers, setEquipiers] = useState(''); 
    const [erreur, setErreur] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (title.trim().length < 5) {
            setErreur("L'intitulé doit faire au moins 5 caractères.");
            return;
        }
        if (!date) {
            setErreur("La date d'échéance est obligatoire.");
            return;
        }

        // Transformation de la chaîne "Paul, Bob" en tableau d'objets [{name: "Paul"}, {name: "Bob"}]
        const equipiersArray = equipiers
            .split(',')
            .map(nom => nom.trim())
            .filter(nom => nom.length > 0)
            .map(nom => ({ name: nom }));

        setErreur('');
        addTask({ 
            title: title.trim(), 
            description: desc, 
            date_echeance: date, 
            date_creation: new Date().toISOString().split('T')[0], 
            etat: 'Nouveau',
            equipiers: equipiersArray // <-- On ajoute le tableau à la tâche
        });
    };

    return (
        <form onSubmit={handleSubmit} className="modal-dossier-form">
            {erreur && <div className="modal-dossier-erreur" style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '10px', background: 'rgba(248, 113, 113, 0.1)', padding: '8px', borderRadius: '6px' }}>{erreur}</div>}

            <div className="form-group-dark">
                <label>Titre de la tâche (min 5 car.) *</label>
                <input type="text" value={title} onChange={e => { setTitle(e.target.value); setErreur(''); }} placeholder="Ex: Finir le rapport..." />
            </div>
            <div className="form-group-dark">
                <label>Description</label>
                <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Détails (optionnel)" rows="2" />
            </div>
            
            {/* NOUVEAU CHAMP : ÉQUIPIERS */}
            <div className="form-group-dark">
                <label>Équipiers (séparés par une virgule)</label>
                <input 
                    type="text" 
                    value={equipiers} 
                    onChange={e => setEquipiers(e.target.value)} 
                    placeholder="Ex: Paul, Alice, Bob..." 
                />
            </div>

            <div className="form-group-dark">
                <label>Échéance *</label>
                <input type="date" value={date} onChange={e => { setDate(e.target.value); setErreur(''); }} />
            </div>
            <div className="modal-dossier-actions">
                <button type="submit" className="btn-submit-dark">Créer la tâche</button>
            </div>
        </form>
    );
};

export default ModalTaskContent;