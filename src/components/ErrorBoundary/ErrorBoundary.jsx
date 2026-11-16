import { Component } from 'react';
import { reportClientError } from '../../monitoring/clientErrors';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // El stack del error indica dónde falló; el de componentes, en qué parte de la interfaz.
    reportClientError({
      name: error?.name,
      message: error?.message,
      stack: [error?.stack, info?.componentStack && 'Componentes:' + info.componentStack].filter(Boolean).join('\n'),
    }, 'react');
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="site-error" role="alert">
          <p className="site-error__eyebrow">Estudio Jurídico RS</p>
          <h1>Ocurrió un inconveniente</h1>
          <p>La página no pudo cargarse. Podés volver al inicio e intentarlo nuevamente.</p>
          <a href="/">Volver al inicio</a>
        </main>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
