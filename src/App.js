import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Layout/Sidebar';
import Users from './components/Pages/Users';
import Header from './components/Layout/Header';
import Epics from './components/Pages/Epics';

import './App.css';
import Footer from './components/Layout/Footer';

function App() {
  const [sideBarToggleState, setSideBarToggleState] = useState(false);
  const sendToggleStateToParent = data => {
    setSideBarToggleState(data);
  }
  return (
    <Fragment>
      <Router>
        <div className="wrapper">
          <aside className={sideBarToggleState === true ? 'active' : ''}>
            <Sidebar></Sidebar>
          </aside>
          <div className={`rightNavigationPage  ${sideBarToggleState === true ? 'active' : ''}`}>
            <Header sendToggleStateToParent={sendToggleStateToParent}></Header>
            <div className="centerTile">
              <Routes>
                <Route exact path="/" element={<Users />} />
                <Route exact path="/user" element={<Users />} />
                <Route exact path="/epics" element={<Epics />} />
              </Routes>
            </div>
            <Footer></Footer>
          </div>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
