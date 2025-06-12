import React from 'react';

const TopHeader = () => {
    return (
        <header className="top-header">
            <nav className="navbar navbar-expand justify-content-between">
                <div className="btn-toggle-menu">
                    <span className="material-symbols-outlined">menu</span>
                </div>
               
                <ul className="navbar-nav top-right-menu gap-2">
               
                    <li className="nav-item dark-mode">
                        <a className="nav-link dark-mode-icon">
                            <span className="material-symbols-outlined">dark_mode</span>
                        </a>
                    </li>
                 
                   
                  
                </ul>
            </nav>
        </header>
    );
};

export default TopHeader;
