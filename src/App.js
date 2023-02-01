import "./App.css";
import React from "react";
import Deposit from "./components/Deposit";
import AccordionCom from "./components/AccordionCom";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" 
              element={
                <div>
                  <Deposit />
                  <AccordionCom />
                  <Footer />
                </div>
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
