import React, { useState, useContext, useEffect } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';

const COULEURS = { 
    indigo: '#6366f1', 
    orange: '#fb923c', 
    pink: '#f472b6', 
    green: '#34d399', 
    red: '#f87171' 
};

const ICONES = [
    { value: '',        label: '📂 Aucune' },
    { value: 'project', label: '📁 Projet' },
    { value: 'star',    label: '⭐ Étoile' },
    { value: 'rocket',  label: '🚀 Rocket' },
    { value: 'bug',     label: '🐛 Bug' },
];

const ModalDossierContent = () => {
    const { dossierAEditer, addDossier, updateDossier } = useContext(TodoContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); // <-- Ajout de la description
    const [color, setColor] = useState('indigo');
    const [icon, setIcon] = useState('');
    const [erreur, setErreur] = useState(''); // <-- Ajout de l'état d'erreur

    useEffect(() => {
        if (dossierAEditer) {
            setTitle(dossierAEditer.title);
            setDescription(dossierAEditer.description || ''); // Pré-remplir la description
            setColor(dossierAEditer.color);
            setIcon(dossierAEditer.icon || '');
        }
    }, [dossierAEditer]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // --- VALIDATION STRICTE DU CAHIER DES CHARGES ---
        if (title.trim().length < 3) {
            setErreur("L'intitulé doit faire au moins 3 caractères.");
            return;
        }

        setErreur('');
        const payload = { title: title.trim(), description, color, icon }; 
        if (dossierAEditer) {
            updateDossier(dossierAEditer.id, payload);
        } else {
            addDossier(payload);
        }
    };

    return (
        <div className="modal-dossier-form">

            {erreur && <div className="modal-dossier-erreur" style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '10px', background: 'rgba(248, 113, 113, 0.1)', padding: '8px', borderRadius: '6px' }}>{erreur}</div>}

            <div className="form-group-dark">
                <label>Nom du dossier (min 3 car.) *</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={e => { setTitle(e.target.value); setErreur(''); }} 
                    placeholder="Nom du dossier..."
                />
            </div>

            <div className="form-group-dark" style={{ marginTop: '15px' }}>
                <label>Description</label>
                <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="Optionnel"
                    rows="2"
                />
            </div>

            <div className="form-group-dark" style={{ marginTop: '15px' }}>
                <label>Couleur</label>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    {Object.keys(COULEURS).map(c => (
                        <div 
                            key={c} 
                            onClick={() => setColor(c)}
                            style={{ 
                                width: '25px', height: '25px', borderRadius: '50%', 
                                background: COULEURS[c], cursor: 'pointer',
                                border: color === c ? '2px solid white' : 'none',
                                transform: color === c ? 'scale(1.2)' : 'none'
                            }} 
                        />
                    ))}
                </div>
            </div>

            <div className="form-group-dark" style={{ marginTop: '15px' }}>
                <label>Icône</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                    {ICONES.map(ic => (
                        <button
                            key={ic.value}
                            onClick={() => setIcon(ic.value)}
                            style={{
                                background: icon === ic.value ? 'rgba(99,102,241,0.15)' : 'var(--bg-deep)',
                                border: `1px solid ${icon === ic.value ? 'var(--accent)' : 'var(--border)'}`,
                                color: icon === ic.value ? 'var(--text-primary)' : 'var(--text-secondary)',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s'
                            }}
                        >
                            {ic.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="modal-dossier-actions" style={{ marginTop: '20px' }}>
                <button onClick={handleSubmit} className="btn-submit-dark">
                    {dossierAEditer ? 'Sauvegarder' : 'Créer le dossier'}
                </button>
            </div>
        </div>
    );
};

export default ModalDossierContent;