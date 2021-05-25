import React from "react";
// let ThemeContext = React.createContext(); // Provider Consumer
import  createContext from '../redux/Context'
let ThemeContext = createContext();

function Header() {
  return (
    <ThemeContext.Consumer>
      {(value) => (
        <div style={{ border: `5px solid ${value.color}` }}> Header</div>
      )}
    </ThemeContext.Consumer>
  );
}

class Main extends React.Component {
  static contextType = ThemeContext;
  render() {
    this.context = ThemeContext.Provider.value;
    return (
      <div style={{ border: `5px solid ${this.context.color}` }}>
        Main
        <Content />
      </div>
    );
  }
}

class Content extends React.Component {
  static contextType = ThemeContext;
  render() {
    this.context = Content.contextType.Provider.value;
    return (
      <div style={{ border: `5px solid ${this.context.color}` }}>
        Content
        <button onClick={() => this.context.changeColor("#f00")}>变红</button>
        <button onClick={() => this.context.changeColor("#0f0")}>变绿</button>
      </div>
    );
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "orange",
    };
  }

  changeColor = (color) => {
    this.setState({
      color,
    });
  };
  render() {
    let value = { color: this.state.color, changeColor: this.changeColor };
    return (
      <ThemeContext.Provider value={value}>
        <div style={{ border: `5px solid ${this.state.color}` }}>
          <Header />
          <Main />
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default Page;
