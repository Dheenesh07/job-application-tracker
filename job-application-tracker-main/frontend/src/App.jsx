import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function App() {
    return (
        <div className="container">
            <header>
                <Link to="/" className="logo-link">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="logo-icon"
                    >
                        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        <rect x="2" y="6" width="20" height="14" rx="2"/>
                    </svg>
                    <h1>Job Tracker</h1>
                </Link>
                <nav>
                    <Link to="/" className="nav-link">Dashboard</Link>
                    <Link to="/jobs/new" className="nav-link button">Add New</Link>
                </nav>
            </header>
            
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default App;