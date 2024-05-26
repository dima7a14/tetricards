import './src/style.css';
import { createApplication } from './src/App';

const root = document.querySelector('#app');

await createApplication(root);
