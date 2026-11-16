import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './pages/home/Home';
import Error404 from './pages/error404/Error404';
import { Contact } from './pages/contact/Contact';
import ServicePage from './pages/service/ServicePage';
import { PageTransitionProvider } from './context/PageTransitionContext';

const App = () => {
  return (
    <PageTransitionProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/servicios/:slug" element={<ServicePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/error" element={<Error404 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </PageTransitionProvider>
  );
};

export default App;
