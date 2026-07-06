import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import ScrollToTop from '../shared/scroll-to-top';

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <Header />


            <Outlet />

            <Footer />

        </div>
    );
}