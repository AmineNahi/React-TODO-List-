# 📝 Ma ToDo-List - Midnight Edition (Mobile-First)

Une application de gestion de tâches performante développée avec **React**, conçue avec une approche **Mobile-First** et un design **Midnight** immersif. Ce projet a été optimisé pour offrir une expérience utilisateur fluide sur smartphone tout en conservant une interface complète sur ordinateur.

---

## 🚀 Installation et Lancement

1. **Cloner le projet**

2. **Installer les dépendances**

   > Nécessite `chart.js` et `react-chartjs-2` pour les statistiques.

   ```bash
   npm install
   ```

3. **Lancer l'application**

   ```bash
   npm start
   ```

4. **Accès Mobile** : Connectez votre Mac et votre iPhone au même réseau Wi-Fi et accédez à l'adresse IP de votre machine (ex : `http://192.168.1.XX:3000`).

---

## 🛠 Fonctionnalités Obligatoires

- **CRUD Complet** : Création, lecture, édition (titre, description, date, équipiers) et suppression sécurisée des tâches.
- **Gestion des Dossiers** : Création, édition et suppression de dossiers avec gestion de couleurs personnalisées.
- **Relations Multi-Dossiers** : Une tâche peut être assignée à plusieurs dossiers simultanément, une fonctionnalité clé de l'architecture.
- **Système de Tri** : Tri dynamique de la liste par date d'échéance, date de création ou ordre alphabétique.
- **Filtrage Avancé** : Filtrage par état (Nouveau, En cours, Réussi, etc.) et par dossier via la barre latérale.
- **Archivage Intelligent** : Option conforme au cahier des charges pour masquer les tâches terminées ou celles expirées depuis plus de 7 jours.

---

## ✨ Fonctionnalités Bonus & Expérience Utilisateur (UX)

### 📱 Optimisation Mobile & Ergonomie

- **Menu Burger (Drawer)** : Sur mobile, les filtres et le graphique sont déportés dans un menu coulissant pour libérer l'espace visuel.
- **Navigation Tactile** : Utilisation des unités dynamiques `100dvh` pour Safari Mobile et zones de clic élargies (min 44px) pour le confort des doigts.
- **Zéro Bordure Blanche** : Reset CSS complet pour une immersion totale dans le thème sombre (*Midnight*), évitant les flashs blancs lors du rebond de scroll sur iOS.

### 🔍 Recherche et Navigation Rapide

- **Barre de Recherche Dynamique** : Filtrage instantané des tâches par titre via le State global.
- **Quick-Filter Labels** : Cliquer sur le badge couleur d'un dossier sur une tâche applique immédiatement le filtre sur ce dossier.

### 📊 Statistiques et Robustesse

- **Dashboard Visuel** : Graphique Doughnut (`Chart.js`) affichant la répartition en temps réel des tâches par état.
- **Reset Backup** : Fonctionnalité permettant de restaurer instantanément l'état initial des données (importées depuis `db.json`).

---

## 🏗 Architecture Technique

- **React Context API** : Utilisation d'un `TodoProvider` pour une gestion d'état centralisée et performante (tâches, relations, dossiers).
- **Composants Modulaires** : Découpage strict du code en composants réutilisables (`Tache`, `List`, `Filtres`, `UnifiedModal`).
- **Responsive Design** : Utilisation de Media Queries avancées pour passer d'un layout 2 colonnes (PC) à un layout vertical avec menu burger (Mobile).

---

## 👨‍💻 Auteur

**Amine Nahi** — Projet réalisé pour le module *Développement d'Applications Mobiles* (2026).