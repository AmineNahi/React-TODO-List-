import React, { useState, useContext, useEffect } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';
import './ModalDossier.css';

const COULEURS = ['orange', 'pink', 'bluesky', 'green', 'red', 'purple', 'yellow', 'teal', 'indigo', 'gray'];

const COLOR_HEX = {
    orange:  '#fb923c',
    pink:    '#f472b6',
    bluesky: '#38bdf8',
    green:   '#34d399',
    red:     '#f87171',
    purple:  '#a78bfa',
    yellow:  '#facc15',
    teal:    '#2dd4bf',
    indigo:  '#6366f1',
    gray:    '#a1a1aa',
};

const ICONES = [
    { value: '',        label: '📂 Aucune' },
    { value: 'project', label: '📁 Projet' },
    { value: 'star',    label: '⭐ Étoile' },
    { value: 'rocket',  label: '🚀 Rocket' },
    { value: 'bug',     label: '🐛 Bug' },
];

const ModalDossier = () => {
    const { isModalDossierOpen, setIsModalDossierOpen, dossierAEditer, addDossier, updateDossier } = useContext(TodoContext);

    const [title, setTitle]         = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor]         = useState('indigo');
    const [icon, setIcon]           = useState('');
    const [erreur, setErreur]       = useState('');

    // Pré-remplir si édition
    useEffect(() => {
        if (dossierAEditer) {
            setTitle(dossierAEditer.title);
            setDescription(dossierAEditer.description || '');
            setColor(dossierAEditer.color || 'indigo');
            setIcon(dossierAEditer.icon || '');
        } else {
            setTitle('');
            setDescription('');
            setColor('indigo');
            setIcon('');
        }
        setErreur('');
    }, [dossierAEditer, isModalDossierOpen]);

    if (!isModalDossierOpen) return null;

    const handleSubmit = () => {
        if (title.trim().length < 3) {
            setErreur("L'intitulé doit faire au moins 3 caractères.");
            return;
        }
        const payload = { title: title.trim(), description, color, icon };
        if (dossierAEditer) {
            updateDossier(dossierAEditer.id, payload);
        } else {
            addDossier(payload);
        }
    };

    const handleClose = () => {
        setIsModalDossierOpen(false);
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-dossier-content" onClick={e => e.stopPropagation()}>
                <h2 className="modal-dossier-title">
                    {dossierAEditer ? '✏️ Modifier le dossier' : '📁 Nouveau dossier'}
                </h2>

                {erreur && <p className="modal-dossier-erreur">{erreur}</p>}

                <div className="modal-dossier-form">
                    <div className="form-group-dark">
                        <label>Intitulé (min 3 car.) *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Nom du dossier"
                        />
                    </div>

                    <div className="form-group-dark">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={2}
                            placeholder="Optionnel"
                        />
                    </div>

                    <div className="form-group-dark">
                        <label>Couleur</label>
                        <div className="color-picker">
                            {COULEURS.map(c => (
                                <button
                                    key={c}
                                    className={`color-dot ${color === c ? 'selected' : ''}`}
                                    style={{ background: COLOR_HEX[c] }}
                                    onClick={() => setColor(c)}
                                    title={c}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-group-dark">
                        <label>Icône</label>
                        <div className="icon-picker">
                            {ICONES.map(ic => (
                                <button
                                    key={ic.value}
                                    className={`icon-btn ${icon === ic.value ? 'selected' : ''}`}
                                    onClick={() => setIcon(ic.value)}
                                >
                                    {ic.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="modal-dossier-actions">
                    <button className="btn-cancel-dark" onClick={handleClose}>Annuler</button>
                    <button className="btn-submit-dark" onClick={handleSubmit}>
                        {dossierAEditer ? 'Sauvegarder' : 'Créer'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalDossier;