import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/login';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import { AuthUserProvider } from './firebase/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <main>
  <AuthUserProvider>
    
  <Router>
    <Switch>
      <Route exact path ="/">
      <LoginPage></LoginPage>
      </Route>
      <Route path ="/pomodoro">
      <App></App>
      </Route>
    </Switch>
  </Router>
  </AuthUserProvider>
    </main>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
