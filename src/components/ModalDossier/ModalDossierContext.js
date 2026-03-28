import React, { useContext } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';
import './Footer.css';

const Footer = () => {
    // On appelle la fonction de Context
    const { openCreationModal } = useContext(TodoContext);

    return (
        <footer>
            {/* Au clic, on ouvre la modale sur l'onglet 'TASK' */}
            <button 
                className="btn-add" 
                onClick={() => openCreationModal('TASK')}
            >
                +
            </button>
        </footer>
    );
};

export default Footer;