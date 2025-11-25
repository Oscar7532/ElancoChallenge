import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import Info from './Info.jsx'
import Report from './Report.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path = "/" element={<App />} />
            <Route path = "/info" element={<Info />} />
            <Route path = "/report" element={<Report />} />
        </Routes>
    </BrowserRouter>,
);