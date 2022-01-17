import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Map from '../routes/map';
import Article from '../routes/article';

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Home path="/" />
      <Map path="/map" country="undefined" />
      <Map path="/map/:country" />
      <Article path="/country/:country" />
    </Router>
  </div>
);

export default App;
