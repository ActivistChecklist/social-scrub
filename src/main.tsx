import '@fontsource-variable/public-sans/wght.css';
import './styles/app.css';
import { render } from 'preact';
import { App } from './app/App';

const root = document.getElementById('app');
if (root) render(<App />, root);
