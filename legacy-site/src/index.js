import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import ProjectList from './components/projectList';
import Contact from './components/contact';
import NavBar from './components/navbar';
import Footer from './components/footer';

ReactDOM.render(
  <HashRouter>
    <div>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/projects" component={ProjectList} />
      <Route path="/contact" component={Contact} />
      <Footer />
    </div>
  </HashRouter>, document.querySelector('.root'));
