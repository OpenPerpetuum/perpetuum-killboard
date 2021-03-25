import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import HeroSection from './components/HeroSection';
import FooterSection from './components/FooterSection';
import KillBoard from './components/KillBoard';
import KillDetail from './components/KillDetail';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <HeroSection />
          <section className="section">
            <div className="container dark">
              <Route exact path="/" component={KillBoard} />
              <Route exact path="/kill/:killId" component={KillDetail} />
            </div>
          </section>
          <FooterSection />
        </div>
      </Router>
    );
  }
}

export default App;
