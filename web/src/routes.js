import React from 'react';
import {
    Routes,
    Route
} from 'react-router-dom';

import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Line } from './pages/Line';
import { NotFound } from './pages/NotFound';
import { TotalLines } from './pages/totalLines'

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Dashboards" element={<Dashboard />}/>
            <Route path="/Lines" element={<Line />}/>
            <Route path="/TotalLines" element={<TotalLines />}/>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}