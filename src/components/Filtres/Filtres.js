import React, { useContext } from 'react';
import { TodoContext } from '../../contexts/ToDoContext';
import { ETATS } from '../../data/constants';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './Filtres.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Filtres = () => {
    const { 
        taches, 
        filterHideCompleted, setFilterHideCompleted,
        filterHideExpired, setFilterHideExpired, 
        filterEtats, setFilterEtats,
        resetData
    } = useContext(TodoContext);

    const labelsEtats = Object.values(ETATS); 
    const dataCounts = labelsEtats.map(etat => taches.filter(t => t.etat === etat).length);

    const dataChart = {
        labels: labelsEtats,
        datasets: [{
            data: dataCounts,
            backgroundColor: ['#6366f1', '#f59e0b', '#10b981', '#64748b', '#ef4444'],
            borderWidth: 0,
            hoverOffset: 4
        }],
    };

    const toggleEtat = (etat) => {
        if (filterEtats.includes(etat)) setFilterEtats([]);
        else setFilterEtats([etat]);
    };

    const handleResetClick = () => {
        if (window.confirm("Êtes-vous sûr(e) de vouloir restaurer les données par défaut ?")) {
            resetData();
        }
    };

    return (
        <div className="filtres-container">
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '15px' }}>
                <button 
                    onClick={handleResetClick}
                    style={{
                        padding: '6px 12px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; }}
                    title="Restaurer le backup initial"
                >
                    🔄 Reset Backup
                </button>
            </div>

            <div className="sidebar-section chart-section">
                <h4>Répartition</h4>
                <div className="sidebar-chart-wrapper">
                    <Doughnut data={dataChart} options={{ plugins: { legend: { display: false } }, maintainAspectRatio: false }} />
                </div>
            </div>

            <div className="filtre-group">
                <label className="checkbox-container">
                    <input type="checkbox" checked={filterHideCompleted} onChange={(e) => setFilterHideCompleted(e.target.checked)} />
                    <span>Masquer terminés</span>
                </label>
                
                <label className="checkbox-container" style={{ marginTop: '8px' }}>
                    <input type="checkbox" checked={filterHideExpired} onChange={(e) => setFilterHideExpired(e.target.checked)} />
                    <span>Masquer expirées (&gt; 7j)</span> 
                </label>
            </div>

            
            <div className="filtre-group">
                <h4>États</h4>
                <div className="tags-list">
                    {Object.values(ETATS).map(etat => (
                        <button 
                            key={etat} 
                            className={`tag-btn ${filterEtats.includes(etat) ? 'active' : ''}`} 
                            onClick={() => toggleEtat(etat)}
                        >
                            {etat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filtres;