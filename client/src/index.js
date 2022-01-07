import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

/*var element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!');
ReactDOM.render(element, document.getElementById('root'));*/

var baseURL = "https://hackathon-imta.osc-fr1.scalingo.io/api/";

class OpSelect extends React.Component{
  constructor(props){
    super(props);
    this.state = {operation: 'multiply'};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){this.setState({operation: event.target.value});}

  render() {
    return (
      <select onChange={this.handleChange}>
        <option value='multiply'>*2</option>
        <option value='divide'>/2</option>
      </select>
    );
  }
}

class NumberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', result: '', operation:''};
    this.OpSelect1 = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    const currentOpSelect = this.OpSelect1.current;
    var url = baseURL;
    switch(currentOpSelect.state.operation){
      case 'multiply':
        url += "multiply2";
        break;
      case 'divide':
        url += "divide2";
        break;
      default:
        break;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(url, {
      method: "PUT",
      body: JSON.stringify( {"number": this.state.value} ),
      headers: myHeaders
    })
      .then(res => res.json())
      .then(
        (res) => {
          this.setState((state, props) => ({result: res.result}))
        }
      );

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Nombre à doubler :
            <input type="number" value={this.state.value} onChange={this.handleChange} />
          </label>
          <OpSelect ref={this.OpSelect1}/>
          <input type="submit" value="Envoyer" />
        </form>
        <p>Résultat : {this.state.result}</p>
      </div>
    );
  }
}

function App(){
  return (
    <NumberForm/>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
