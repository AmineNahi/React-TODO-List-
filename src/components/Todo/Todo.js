import React, { useContext } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';
import Tri from '../Tri/Tri';
import List from '../List/List';
import DossierGrid from '../DossierGrid/DossierGrid';
import './Todo.css';

const Todo = () => {
    const { currentDossier, setCurrentDossier, searchTerm, setSearchTerm } = useContext(TodoContext);

    return (
        <section className="todo-container">
            {currentDossier ? (
                <>
                    <div className="breadcrumb">
                        <button className="btn-back" onClick={() => setCurrentDossier(null)}>
                            ← Retour
                        </button>
                        <span className="breadcrumb-sep">/</span>
                        <span className="breadcrumb-current">{currentDossier.title}</span>
                    </div>
                </>
            ) : (
                <DossierGrid />
            )}

            {/* --- BARRE DE RECHERCHE BONUS --- */}
            <div className="search-bar-container" style={{ margin: '20px 0' }}>
                <input
                    type="text"
                    placeholder="🔍 Rechercher une tâche par son nom..."
                    value={searchTerm || ""}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                    style={{
                        width: '100%',
                        padding: '12px 15px',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
            </div>

            {!currentDossier && (
                <div className="section-divider">
                    <span>Tâches sans dossier</span>
                </div>
            )}
            
            <Tri />
            <List />
        </section>
    );
};

export default Todo;