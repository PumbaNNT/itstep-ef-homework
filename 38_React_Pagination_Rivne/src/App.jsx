import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import CityInfo from "./pages/CityInfo.jsx";
import MainLandmark from "./pages/MainLandmark.jsx";
import Landmarks from "./pages/Landmarks.jsx";
import Photos from "./pages/Photos.jsx";
import AddLandmark from "./pages/AddLandmark.jsx";
import Schools from "./pages/Schools.jsx";
import NotFound from "./pages/NotFound.jsx";
import { landmarks as initialLandmarks } from "./data/rivne.js";

// Сайт про Рівне: маршрутизація (ДЗ Routing) + форма /add (ДЗ Forms)
// + нова сторінка /schools: школи міста завантажуються через fetch у useEffect, є пагінація.
export default function App() {
    const [landmarks, setLandmarks] = useState(initialLandmarks);

    function addLandmark(landmark) {
        setLandmarks(prev => [...prev, { ...landmark, id: Date.now() }]);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<CityInfo />} />
                    <Route path="landmark" element={<MainLandmark />} />
                    <Route path="landmarks" element={<Landmarks landmarks={landmarks} />} />
                    <Route path="photos" element={<Photos />} />
                    <Route path="schools" element={<Schools />} />
                    <Route path="add" element={<AddLandmark onAdd={addLandmark} />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
