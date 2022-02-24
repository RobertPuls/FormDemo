import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WorkFlowProvider } from './context/WorkFlowContext';

ReactDOM.render(
  <React.StrictMode>
    <WorkFlowProvider>
      <App />
    </WorkFlowProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
