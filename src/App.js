import "./App.css";
import React from "react";
import Landing from "./components/Landing";
import Deposit from "./components/Deposit";
import AccordionCom from "./components/AccordionCom";
import Footer from "./components/Footer";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Landing />
        <Deposit />
        <AccordionCom />
        <Footer />
      </div>
    );
  }
}

export default App;
