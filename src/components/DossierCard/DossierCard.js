import React, { useContext } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';
import { ETAT_TERMINE } from '../../data/constants';
import './DossierCard.css';

// Map des couleurs nommées vers des valeurs CSS
const COLOR_MAP = {
    orange:  { bg: 'rgba(251,146,60,0.12)',  border: 'rgba(251,146,60,0.35)',  text: '#fb923c' },
    pink:    { bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.35)', text: '#f472b6' },
    bluesky: { bg: 'rgba(56,189,248,0.12)',  border: 'rgba(56,189,248,0.35)',  text: '#38bdf8' },
    green:   { bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.35)',  text: '#34d399' },
    red:     { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.35)', text: '#f87171' },
    purple:  { bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.35)', text: '#a78bfa' },
    yellow:  { bg: 'rgba(250,204,21,0.12)',  border: 'rgba(250,204,21,0.35)',  text: '#facc15' },
    teal:    { bg: 'rgba(45,212,191,0.12)',  border: 'rgba(45,212,191,0.35)',  text: '#2dd4bf' },
    indigo:  { bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.35)',  text: '#6366f1' },
    gray:    { bg: 'rgba(161,161,170,0.12)', border: 'rgba(161,161,170,0.35)', text: '#a1a1aa' },
};

const ICON_MAP = {
    project: '📁',
    star:    '⭐',
    rocket:  '🚀',
    bug:     '🐛',
    default: '📂',
};

const DossierCard = ({ dossier }) => {
    const { relations, taches, setCurrentDossier, ouvrirEditionDossier, deleteDossier, filterHideCompleted } = useContext(TodoContext);
    const colors = COLOR_MAP[dossier.color] || COLOR_MAP.gray;
    const icon = ICON_MAP[dossier.icon] || ICON_MAP.default;

    // Nb de tâches dans ce dossier (cohérent avec les filtres)
    const nbTaches = relations.filter(rel => {
        if (rel.dossier !== dossier.id) return false;
        
        const tacheAssociee = taches.find(t => t.id === rel.tache);
        // Si on masque les terminées, on ne les compte pas dans le badge
        if (filterHideCompleted && tacheAssociee && ETAT_TERMINE.includes(tacheAssociee.etat)) {
            return false;
        }
        return true;
    }).length;

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm(`Supprimer le dossier "${dossier.title}" ? Les tâches ne seront pas supprimées.`)) {
            deleteDossier(dossier.id);
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        ouvrirEditionDossier(dossier);
    };

    return (
        <div
            className="dossier-card"
            style={{ background: colors.bg, borderColor: colors.border }}
            onClick={() => setCurrentDossier(dossier)}
        >
            <div className="dossier-card-icon" style={{ color: colors.text }}>{icon}</div>
            <div className="dossier-card-body">
                <h3 className="dossier-card-title" style={{ color: colors.text }}>{dossier.title}</h3>
                {dossier.description && (
                    <p className="dossier-card-desc">{dossier.description}</p>
                )}
                <span className="dossier-card-count">{nbTaches} tâche{nbTaches > 1 ? 's' : ''}</span>
            </div>
            <div className="dossier-card-actions">
                <button className="dossier-action-btn" onClick={handleEdit} title="Modifier">✏️</button>
                <button className="dossier-action-btn dossier-action-delete" onClick={handleDelete} title="Supprimer">🗑️</button>
            </div>
            <div className="dossier-card-arrow" style={{ color: colors.text }}>›</div>
        </div>
    );
};

export default DossierCard;