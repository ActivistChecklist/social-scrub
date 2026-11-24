import '@fontsource-variable/public-sans/wght.css';
import './styles/app.css';
import { render } from 'preact';
import { App } from './app/App';
import { trackPageView } from './lib/events';

const root = document.getElementById('app');
if (root) render(<App />, root);
trackPageView();
