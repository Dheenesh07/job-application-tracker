import React from 'react';
import ReactDOM from 'react-dom/client';

import { createHashRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';

import JobList from './pages/JobList.jsx';
import JobForm from './pages/JobForm.jsx';
import JobDetails from './pages/JobDetails.jsx'
import './index.css';
import './App.css';

const router = createHashRouter([
    {
        path: '/',
        element: <App />, 
        children: [
            {
                path: '/', 
                element: <JobList />,
            },
            {
                path: '/jobs/new', 
                element: <JobForm />,
            },
            {
                path: '/jobs/:id/edit', 
                element: <JobForm />, 
            },
            { 
                path: '/jobs/:id', 
                element: <JobDetails /> 
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);