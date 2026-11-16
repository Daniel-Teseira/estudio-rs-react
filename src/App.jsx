import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './pages/home/Home';
import Error404 from './pages/error404/Error404';
import { Contact } from './pages/contact/Contact';
import ServicePage from './pages/service/ServicePage';
import { PageTransitionProvider } from './context/PageTransitionContext';
import { CONTACT_PATH, HOME_PATH, legacyRedirects } from './routes';

const App = () => {
  return (
    <PageTransitionProvider>
      <NavBar />
      <Routes>
        <Route path={HOME_PATH} element={<Home />} />
        <Route path="/servicios/:slug" element={<ServicePage />} />
        <Route path={CONTACT_PATH} element={<Contact />} />
        {legacyRedirects.map(({ source, destination }) => (
          <Route key={source} path={source} element={<Navigate to={destination} replace />} />
        ))}
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </PageTransitionProvider>
  );
};

export default App;
