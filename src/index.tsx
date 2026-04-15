import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import Weather from './components/Weather';

import './main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Weather />);