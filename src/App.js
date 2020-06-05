import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Account from './pages/Account'
import Login from './pages/Login'

//Firebase
import firebase from './shared/firebase.js';
import 'firebase/database';

// Material UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const THEME = createMuiTheme({
  typography: {
    "fontFamily": "\"Manrope\", sans-serif"
  }
});

var firebaseConfig = {
  apiKey: "AIzaSyCa-2nP5S12sWGsBv1ln1_9adxubHTD0mw",
  authDomain: "quick-travis-434c3.firebaseapp.com",
  databaseURL: "https://quick-travis-434c3.firebaseio.com",
  projectId: "quick-travis-434c3",
  storageBucket: "quick-travis-434c3.appspot.com",
  messagingSenderId: "1075108870838",
  appId: "1:1075108870838:web:8d1f259d09fae5281e0417"
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null)

  useEffect(() => {
   firebase.auth().onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('user', null)
    } 
  }, [user])

  return (
    <div className="App">
      <header className="App-header">
      <MuiThemeProvider theme={THEME}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={() => <Login user={user}/>}></Route>
            <Route path="/home" exact component={() => <Home user={user}/>}></Route>
            <Route path="/account" exact component={() => <Account user={user}/>}></Route>
            <Route path="/" render={() => <div>404</div>}></Route>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
      </header>
    </div>
  );
}

export default App;
