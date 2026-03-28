import React, { useContext } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';
import ModalTaskContent from '../ModalForm/ModalTaskContent'; 
import ModalDossierContent from '../ModalDossier/ModalDossierContent';
import './UnifiedModal.css';

const UnifiedModal = () => {
    const { 
        isUnifiedModalOpen, 
        setIsUnifiedModalOpen, 
        activeTab, 
        setActiveTab, 
        dossierAEditer 
    } = useContext(TodoContext);

    if (!isUnifiedModalOpen) return null;

    return (
        <div className="modal-overlay" onClick={() => setIsUnifiedModalOpen(false)}>
            <div className="unified-modal-content" onClick={e => e.stopPropagation()}>
                
                {/* On n'affiche les onglets que si on ne modifie pas un dossier existant */}
                {!dossierAEditer && (
                    <div className="modal-tabs">
                        <button 
                            className={`tab-btn ${activeTab === 'TASK' ? 'active' : ''}`}
                            onClick={() => setActiveTab('TASK')}
                        >
                            ✨ Nouvelle Tâche
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'DOSSIER' ? 'active' : ''}`}
                            onClick={() => setActiveTab('DOSSIER')}
                        >
                            📁 Nouveau Dossier
                        </button>
                    </div>
                )}

                <div className="modal-body-content">
                    {activeTab === 'TASK' ? (
                        <ModalTaskContent />
                    ) : (
                        <ModalDossierContent />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UnifiedModal;