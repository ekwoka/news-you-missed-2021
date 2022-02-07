import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Map from '../routes/map';
import Article from '../routes/article';
import Articles from '../routes/articles';
import Random from '../routes/random';

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Home path="/" />
      <Map path="/map" country="undefined" />
      <Map path="/map/:country" />
      <Article path="/article/:country" />
      <Articles path="/articles" />
      <Random path="/random" />
    </Router>
  </div>
);

export default App;
