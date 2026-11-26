import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import CityInfo from "./pages/CityInfo.jsx";
import MainLandmark from "./pages/MainLandmark.jsx";
import Landmarks from "./pages/Landmarks.jsx";
import Photos from "./pages/Photos.jsx";
import NotFound from "./pages/NotFound.jsx";

// 4 маршрути:
//  /           — інформація про місто
//  /landmark   — найвідоміша пам'ятка
//  /landmarks  — інші пам'ятки
//  /photos     — фотографії міста
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<CityInfo />} />
                    <Route path="landmark" element={<MainLandmark />} />
                    <Route path="landmarks" element={<Landmarks />} />
                    <Route path="photos" element={<Photos />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
