import "./App.css";
import React from "react";
import Landing from "./components/Landing";
import Deposit from "./components/Deposit";
import AccordionCom from "./components/AccordionCom";
import Info from "./components/Info";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Landing />
        <Info />
        <Deposit />
        <AccordionCom />
      </div>
    );
  }
}

export default App;