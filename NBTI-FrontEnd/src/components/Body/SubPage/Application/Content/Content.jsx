import MyVacation from './MyVacation/MyVacation';
import { Routes, Route } from 'react-router-dom';

export const Content = () => {
    return (
        <Routes>
            <Route path="/" element={<MyVacation />} />
            <Route path="/myvacation/*" element={<MyVacation />} />
        </Routes>
    );
};
