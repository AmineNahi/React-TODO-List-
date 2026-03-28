import React, { useContext } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';
import Tache from '../Tache/Tache';
import { ETAT_TERMINE } from '../../data/constants';
import './List.css';

const List = () => {
    const { 
        taches, relations, sortBy, 
        filterHideCompleted, filterHideExpired, 
        filterEtats, filterDossiers, 
        currentDossier,
        searchTerm 
    } = useContext(TodoContext);
    
    const safeTaches = taches || [];
    const safeRelations = relations || [];

    const ilYAUneSemaine = new Date();
    ilYAUneSemaine.setDate(ilYAUneSemaine.getDate() - 7);
    ilYAUneSemaine.setHours(0, 0, 0, 0);

    const tachesFiltrees = safeTaches.filter(tache => {
        
        // --- FILTRE RECHERCHE (BONUS) ---
        if (searchTerm && !tache.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }

        // 1. Filtre expirées (> 7j)
        const dateEcheance = new Date(tache.date_echeance);
        if (filterHideExpired && dateEcheance < ilYAUneSemaine) return false; 

        // 2. Filtre terminées
        if (filterHideCompleted && ETAT_TERMINE.includes(tache.etat)) return false;
        
        // 3. Filtre par États
        if (filterEtats.length > 0 && !filterEtats.includes(tache.etat)) return false;

        // 4. Filtre Dossier
        if (filterDossiers.length > 0) {
            const appartientAuFiltre = safeRelations.some(rel => rel.tache === tache.id && filterDossiers.includes(rel.dossier));
            if (!appartientAuFiltre) return false;
        } 
        else if (currentDossier) {
            const estDansDossier = safeRelations.some(rel => rel.tache === tache.id && rel.dossier === currentDossier.id);
            if (!estDansDossier) return false;
        } 
        else {
            const aDossier = safeRelations.some(rel => rel.tache === tache.id);
            if (aDossier) return false;
        }

        return true;
    });

    // Tri
    const tachesTriees = [...tachesFiltrees].sort((a, b) => {
        if (sortBy === 'ECHEANCE') return new Date(a.date_echeance) - new Date(b.date_echeance);
        if (sortBy === 'CREATION') return new Date(b.date_creation) - new Date(a.date_creation);
        if (sortBy === 'NOM') return a.title.localeCompare(b.title);
        return 0;
    });

    return (
        <div className="list-container">
            {tachesTriees.length === 0 ? (
                <div className="list-empty-state">
                    <p>Aucune tâche à afficher.</p>
                </div>
            ) : (
                tachesTriees.map(tache => <Tache key={tache.id} data={tache} />)
            )}
        </div>
    );
};

export default List;