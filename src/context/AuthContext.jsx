// AuthContext.js
import PropTypes from "prop-types"
import React, { useState, useEffect, useContext, useCallback, createContext } from 'react';

import API_URL from 'src/config';

// Créer le context
const AuthContext = createContext();

// Fonction pour fournir le context au reste de l'application
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [refresh, setRefrech] = useState(localStorage.getItem('refresh') || null);

    // Fonction de login
    const login = (userData,techData , authToken, authRefresh) => {
        setUser(userData);
        setToken(authToken);
        const userJson = JSON.stringify(userData);
        const techJson = JSON.stringify(techData);
        localStorage.setItem('user', userJson);
        localStorage.setItem('tech', techJson);
        localStorage.setItem('token', authToken);
        localStorage.setItem('refresh', authRefresh);
    };

    // Fonction de logout
    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.setItem('user', '');
        localStorage.setItem('tech', '');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
    }, []);

    // Fonction de rafraîchissement du token

    const refreshAuthToken = useCallback((newToken, newRefresh) => {
        setToken(newToken);
        setRefrech(newRefresh);
        localStorage.setItem('token', newToken);
        localStorage.setItem('refresh', newRefresh);
    }, []);


    const updateToken = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh })
            });

            if (response.status === 200) {
                const data = await response.json();
                refreshAuthToken(data.access, data.refresh);
            } else {
                console.error('Erreur de serveur :', response.status, response.statusText);
                logout(); // Déconnexion en cas d'échec du rafraîchissement
            }
        } catch (error) {
            console.error('Erreur de réseau :', error);
            logout(); // Déconnexion en cas d'erreur réseau
        }
    }, [refresh, refreshAuthToken, logout]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateToken();
        }, 1000 * 6 * 15); // Rafraîchir toutes les 15 minutes

        return () => clearInterval(intervalId);

    }, [updateToken]);

    


    // Fournir les fonctions et les données du context
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const contextValue = {
        user,
        token,
        login,
        logout,
        refreshAuthToken,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.any
}

// Fonction personnalisée pour utiliser le context dans un composant
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé à l intérieur d\'un AuthProvider');
    }
    return context;
};
