import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Common.css';

const handleLogout = () => {
  // Supprimer le token du localStorage
  localStorage.removeItem('token');
  // Rediriger l'utilisateur vers la page de connexion
  window.location.href = '/authentification?message=Vous%20avez%20été%20déconnecté';
};

const Header = () => {
  const [prenom, setPrenom] = useState('');
  const isLoggedIn = localStorage.getItem('token') !== null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('id_utilisateur');
        if (!userId) {
          throw new Error('User ID not found in localStorage');
        }

        const token = localStorage.getItem('token');
        const url = `http://localhost:8080/utilisateurs/${userId}`;
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setPrenom(data.prenom);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <nav className="navbar navbar-expand-sm ">
        <div className="container-fluid">
          <Link to="authentification" className="navbar-brand" href="#">
            {!isLoggedIn && <span className="navbar-text">Connexion / Inscription</span>}
          </Link>
          {isLoggedIn && (
            <div className="d-flex align-items-center">
              <button onClick={handleLogout} className="btn btn-secondary">Se déconnecter</button>
              <span className="navbar-text me-3">Bonjour, {prenom}</span>

            </div>
          )}
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="show-plante">
                  Accueil
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="create-plante">
                  Creer une plante
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="show-my-plante">
                  Mon profil
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
