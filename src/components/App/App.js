import React, { useState } from 'react';
import { TodoProvider } from '../../contexts/ToDoContext';
import Header from '../Header/Header';
import Todo from '../Todo/Todo';
import Footer from '../Footer/Footer';
import Filtres from '../Filtres/Filtres';
import UnifiedModal from '../UnifiedModal/UnifiedModal'; 
import './App.css';

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <TodoProvider>
            <div className="App">
                {/* BOUTON BURGER (Caché sur PC via CSS) */}
                <button className="burger-btn" onClick={() => setIsMenuOpen(true)}>
                    ☰
                </button>

                <div className="app-layout">
                    {/* OVERLAY MOBILE */}
                    <div 
                        className={`sidebar-overlay ${isMenuOpen ? 'show' : ''}`} 
                        onClick={() => setIsMenuOpen(false)}
                    ></div>

                    <main className="main-content">
                        <Header />
                        <div className="scroll-area">
                            <Todo />
                        </div>
                        <Footer />
                    </main>

                    {/* SIDEBAR : Mobile (coulissant) / PC (fixe à droite) */}
                    <aside className={`sidebar-right ${isMenuOpen ? 'open' : ''}`}>
                        <div className="sidebar-mobile-header">
                            <span>Configuration</span>
                            <button onClick={() => setIsMenuOpen(false)}>✕</button>
                        </div>
                        <Filtres closeMenu={() => setIsMenuOpen(false)} />
                    </aside>
                </div>
                
                <UnifiedModal />
            </div>
        </TodoProvider>
    );
};

export default App;