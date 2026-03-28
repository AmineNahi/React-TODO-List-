// src/components/Tache/Tache.js
import React, { useState, useContext } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';
import './Tache.css';

const Tache = ({ data }) => {
    const [isComplet, setIsComplet] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Context : on récupère les dossiers, les relations, et les outils de modification
    // NOUVEAU : on récupère aussi setFilterDossiers pour le raccourci
    const { 
        dossiers, 
        relations, 
        updateTask,
        updateTaskRelations, 
        deleteTask,
        setFilterDossiers 
    } = useContext(TodoContext);

    // Conversion du tableau d'équipiers pour l'édition
    const initialEquipiers = (data.equipiers || []).map(e => e.name).join(', ');

    // Calcul des dossiers associés à cette tâche
    const relationsDeLaTache = relations.filter(rel => rel.tache === data.id);
    const dossiersDeLaTache = relationsDeLaTache.map(rel =>
        dossiers.find(d => d.id === rel.dossier)
    ).filter(d => d !== undefined);
    
    // Sur la carte fermée, on n'affiche que les 2 premiers pour gagner de la place
    const dossiersAAfficher = isComplet ? dossiersDeLaTache : dossiersDeLaTache.slice(0, 2);

    // États du formulaire d'édition
    const [editTitle, setEditTitle] = useState(data.title);
    const [editDescription, setEditDescription] = useState(data.description);
    const [editDateEcheance, setEditDateEcheance] = useState(data.date_echeance);
    const [editEquipiers, setEditEquipiers] = useState(initialEquipiers);
    const [selectedDossiers, setSelectedDossiers] = useState(dossiersDeLaTache.map(d => d.id));
    const [erreur, setErreur] = useState('');

    // --- NOUVELLE FONCTION : RACCOURCI TACTIL (Clic sur Tag) ---
    const handleTagClick = (e, dossierId) => {
        e.stopPropagation(); // Évite d'ouvrir/fermer la tâche au clic
        setFilterDossiers([dossierId]); // Active le filtre exclusif sur ce dossier
    };

    // Gestion de la sélection des dossiers (cocher/décocher)
    const handleToggleDossier = (dossierId) => {
        if (selectedDossiers.includes(dossierId)) {
            setSelectedDossiers(selectedDossiers.filter(id => id !== dossierId)); // Décocher
        } else {
            setSelectedDossiers([...selectedDossiers, dossierId]); // Cocher
        }
    };

    // Sauvegarde des modifications
    const handleEditSubmit = () => {
        if (editTitle.trim().length < 5) {
            setErreur("L'intitulé doit faire au moins 5 caractères.");
            return;
        }
        if (!editDateEcheance) {
            setErreur("La date d'échéance est obligatoire.");
            return;
        }

        const equipiersArray = editEquipiers
            .split(',')
            .map(nom => nom.trim())
            .filter(nom => nom.length > 0)
            .map(nom => ({ name: nom }));

        // 1. Mise à jour des champs de la tâche
        updateTask(data.id, {
            title: editTitle.trim(),
            description: editDescription,
            date_echeance: editDateEcheance,
            equipiers: equipiersArray
        });

        // 2. Mise à jour des relations tâche-dossiers
        if (updateTaskRelations) {
            updateTaskRelations(data.id, selectedDossiers);
        }

        setErreur('');
        setIsEditing(false);
    };

    // Annulation de l'édition
    const handleEditCancel = () => {
        setEditTitle(data.title);
        setEditDescription(data.description);
        setEditDateEcheance(data.date_echeance);
        setEditEquipiers(initialEquipiers);
        setSelectedDossiers(dossiersDeLaTache.map(d => d.id)); // On remet à zéro la sélection
        setErreur('');
        setIsEditing(false);
    };

    const handleDelete = (e) => {
        e.stopPropagation(); // Pour ne pas ouvrir/fermer la tâche en cliquant sur supprimer
        if (window.confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
            deleteTask(data.id);
        }
    };

    return (
        <div className="tache-card">
            {/* EN-TÊTE : Titre + Échéance (cliquable pour ouvrir) */}
            <div
                className="tache-header"
                onClick={() => !isEditing && setIsComplet(!isComplet)}
                style={{ cursor: isEditing ? 'default' : 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <div>
                    <h3 className="tache-title">{data.title}</h3>
                    <span className="tache-date">
                        Échéance : {new Date(data.date_echeance).toLocaleDateString('fr-FR')}
                    </span>
                </div>
                
                {!isEditing && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {/* BOUTON SUPPRIMER */}
                        <button 
                            onClick={handleDelete}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                opacity: 0.6,
                                padding: '5px'
                            }}
                            title="Supprimer la tâche"
                        >
                            🗑️
                        </button>
                        
                        <button className="tache-toggle">
                            {isComplet ? '▲' : '▼'}
                        </button>
                    </div>
                )}
            </div>

            {/* --- NOUVEAU : BADGES DE DOSSIERS CLIQUABLES (Optimisés Tactil) --- */}
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {dossiersAAfficher.map(dossier => (
                    <span 
                        key={dossier.id} 
                        className="tag-badge"
                        onClick={(e) => handleTagClick(e, dossier.id)} // Active le filtre au clic
                        style={{
                            background: dossier.color, 
                            color: 'white', 
                            padding: '8px 12px', // Plus grand pour le tactil
                            borderRadius: '12px', 
                            fontSize: '0.85rem',
                            cursor: 'pointer', // Montre que c's cliquable
                            transition: 'opacity 0.2s',
                            textAlign: 'center',
                            minWidth: '60px' // Zone minimale pour le doigt
                        }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                        title={`Filtrer par : ${dossier.title}`}
                    >
                        {dossier.title}
                    </span>
                ))}
            </div>

            {/* DÉTAILS DE LA TÂCHE (Affichés quand developed) */}
            {isComplet && (
                <div className="tache-details">
                    {!isEditing && (
                        <>
                            <p><strong>Description :</strong> {data.description || "Aucune description"}</p>
                            <p><strong>État :</strong> {data.etat}</p>
                            
                            {(data.equipiers || []).length > 0 && (
                                <p><strong>Équipe :</strong> {data.equipiers.map(e => e.name).join(', ')}</p>
                            )}

                            <button className="btn-edit" onClick={() => {
                                // Au clic sur Modifier, on force la synchro des données pour charger les selectedDossiers
                                setEditTitle(data.title);
                                setEditDescription(data.description);
                                setEditDateEcheance(data.date_echeance);
                                setEditEquipiers(initialEquipiers);
                                setSelectedDossiers(dossiersDeLaTache.map(d => d.id)); // <--- CORRECTIF ICI
                                setIsEditing(true);
                            }}>
                                ✏️ Modifier
                            </button>
                        </>
                    )}

                    {/* FORMULAIRE D'ÉDITION */}
                    {isEditing && (
                        <div className="edit-form">
                            {erreur && <p className="edit-erreur">{erreur}</p>}

                            <div className="edit-group">
                                <label>Intitulé (min 5 car.) *</label>
                                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                            </div>

                            <div className="edit-group">
                                <label>Description</label>
                                <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={3} />
                            </div>

                            <div className="edit-group">
                                <label>Équipiers (séparés par une virgule)</label>
                                <input type="text" value={editEquipiers} onChange={(e) => setEditEquipiers(e.target.value)} />
                            </div>

                            <div className="edit-group">
                                <label>Date d'échéance *</label>
                                <input type="date" value={editDateEcheance} onChange={(e) => setEditDateEcheance(e.target.value)} />
                            </div>

                            {/* --- SÉLECTEUR DE DOSSIERS (cocher/décocher) --- */}
                            <div className="edit-group">
                                <label>Dossiers associés</label>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                                    {dossiers.map(dossier => {
                                        const isSelected = selectedDossiers.includes(dossier.id);
                                        return (
                                            <button
                                                key={dossier.id}
                                                type="button"
                                                onClick={() => handleToggleDossier(dossier.id)}
                                                style={{
                                                    background: isSelected ? dossier.color : 'transparent',
                                                    color: isSelected ? 'white' : 'var(--text-secondary)',
                                                    border: `1px solid ${isSelected ? dossier.color : 'var(--border)'}`,
                                                    padding: '8px 14px', // Plus grand pour tactile
                                                    borderRadius: '16px',
                                                    fontSize: '0.8rem',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {isSelected ? '✓ ' : '+ '}{dossier.title}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="edit-actions">
                                <button type="button" className="btn-cancel-edit" onClick={handleEditCancel}>Annuler</button>
                                <button type="button" className="btn-save-edit" onClick={handleEditSubmit}>✅ Sauvegarder</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Tache;