import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.less';
import UserContextComponent from './components/ContextComponent/UserContextComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <UserContextComponent>
        <App />
    </UserContextComponent>
  </BrowserRouter>
);

