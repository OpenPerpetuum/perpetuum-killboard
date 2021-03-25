import React, { Component } from "react";
import { Link } from 'react-router-dom';

class HeroSection extends Component {
    render() {
      return (
        <section className="hero is-small is-dark gray">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                <Link to="/">
                  Open Perpetuum Killboard
                </Link>
              </h1>
              <h2 className="subtitle">
                v0.3
              </h2>
            </div>
          </div>
        </section>
      );
    }
  }

export default HeroSection;