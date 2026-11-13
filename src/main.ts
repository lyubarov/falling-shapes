import './styles.css';
import { App } from './App';

const root = document.getElementById('app');
if (!root) throw new Error('#app root not found');

const app = new App();
app.init(root).catch((error: unknown) => console.error('Failed to start the app', error));

import.meta.hot?.dispose(() => app.destroy());
