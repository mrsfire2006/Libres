import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">

            <Header />


            <Outlet />

            <Footer />

        </div>
    );
}