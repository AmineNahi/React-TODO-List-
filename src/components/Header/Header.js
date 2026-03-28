import React, { useContext } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';
import { ETAT_TERMINE } from '../../data/constants';
import './Header.css';

const Header = () => {
    const { taches } = useContext(TodoContext);
    const nbTotal = taches.length;
    const nbNonFinis = taches.filter(tache => !ETAT_TERMINE.includes(tache.etat)).length;

    return (
        <header>
            <div className="header-info-wrapper">
                <h1>Ma ToDo-List</h1>
                <div className="header-stats">
                    <span>Total : <strong>{nbTotal}</strong></span>
                    <span>À faire : <strong>{nbNonFinis}</strong></span>
                </div>
            </div>
        </header>
    );
};

export default Header;