import React, { createContext, useState } from 'react';
import initialData from '../data/db.json';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [taches, setTaches] = useState(initialData.taches || []);
    const [dossiers, setDossiers] = useState(initialData.dossiers || []);
    const [relations, setRelations] = useState(initialData.relations || []);

    const [currentDossier, setCurrentDossier] = useState(null);
    const [dossierAEditer, setDossierAEditer] = useState(null);

    const [isUnifiedModalOpen, setIsUnifiedModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('TASK');

    const [sortBy, setSortBy] = useState('ECHEANCE');
    const [filterHideCompleted, setFilterHideCompleted] = useState(false);
    const [filterHideExpired, setFilterHideExpired] = useState(true);
    const [filterEtats, setFilterEtats] = useState([]);
    const [filterDossiers, setFilterDossiers] = useState([]);
    
    // --- ÉTAT POUR LA RECHERCHE (BONUS) ---
    const [searchTerm, setSearchTerm] = useState("");
    
    const openCreationModal = (tab = 'TASK') => {
        setDossierAEditer(null);
        setActiveTab(tab);
        setIsUnifiedModalOpen(true);
    };

    const ouvrirEditionDossier = (dossier) => {
        setDossierAEditer(dossier);
        setActiveTab('DOSSIER');
        setIsUnifiedModalOpen(true);
    };

    const addTask = (nouvelleTache) => {
        const id = taches.length > 0 ? Math.max(...taches.map(t => t.id)) + 1 : 1;
        setTaches([...taches, { ...nouvelleTache, id }]);
        if (currentDossier) {
            setRelations([...relations, { tache: id, dossier: currentDossier.id }]);
        }
        setIsUnifiedModalOpen(false);
    };

    const updateTask = (id, champs) => {
        setTaches(taches.map(t => t.id === id ? { ...t, ...champs } : t));
    };

    const updateTaskRelations = (tacheId, dossierIds) => {
        const autresRelations = relations.filter(rel => rel.tache !== tacheId);
        const nouvellesRelations = dossierIds.map(dId => ({ tache: tacheId, dossier: dId }));
        setRelations([...autresRelations, ...nouvellesRelations]);
    };

    const deleteTask = (id) => {
        setTaches(taches.filter(t => t.id !== id));
        setRelations(relations.filter(rel => rel.tache !== id));
    };

    const addDossier = (d) => {
        const id = dossiers.length > 0 ? Math.max(...dossiers.map(dos => dos.id)) + 1 : 201;
        setDossiers([...dossiers, { ...d, id }]);
        setIsUnifiedModalOpen(false);
    };

    const updateDossier = (id, champs) => {
        setDossiers(dossiers.map(d => d.id === id ? { ...d, ...champs } : d));
        if (currentDossier?.id === id) setCurrentDossier({ ...currentDossier, ...champs });
        setIsUnifiedModalOpen(false);
    };

    const deleteDossier = (id) => {
        setDossiers(dossiers.filter(d => d.id !== id));
        setRelations(relations.filter(rel => rel.dossier !== id));
        if (currentDossier?.id === id) setCurrentDossier(null);
    };

    const resetData = () => {
        setTaches(initialData.taches || []);
        setDossiers(initialData.dossiers || []);
        setRelations(initialData.relations || []);
        setCurrentDossier(null);
        setFilterEtats([]);
        setFilterDossiers([]);
        setSearchTerm(""); 
    };

    return (
        <TodoContext.Provider value={{
            taches, dossiers, relations, currentDossier, setCurrentDossier,
            isUnifiedModalOpen, setIsUnifiedModalOpen, activeTab, setActiveTab, openCreationModal,
            dossierAEditer, setDossierAEditer, addTask, updateTask, updateTaskRelations, deleteTask,
            addDossier, updateDossier, deleteDossier, ouvrirEditionDossier,
            sortBy, setSortBy, filterHideCompleted, setFilterHideCompleted, filterHideExpired, 
            setFilterHideExpired, filterEtats, setFilterEtats, filterDossiers, setFilterDossiers,
            resetData, searchTerm, setSearchTerm 
        }}>
            {children}
        </TodoContext.Provider>
    );
};