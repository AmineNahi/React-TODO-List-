import React, { useContext } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';
import './Footer.css';

const Footer = () => {
    // On récupère la nouvelle fonction de création centralisée
    const { openCreationModal } = useContext(TodoContext);

    return (
        <footer>
            <button 
                className="btn-add" 
                onClick={() => openCreationModal('TASK')} 
                title="Ajouter quelque chose"
            >
                +
            </button>
        </footer>
    );
};

export default Footer;