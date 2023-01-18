import "./App.css";
import React from "react";
import Deposit from "./components/Deposit";
import AccordionCom from "./components/AccordionCom";
import Footer from "./components/Footer";


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Deposit />
        <AccordionCom />
        <Footer />
      </div>
    );
  }
}

export default App;
