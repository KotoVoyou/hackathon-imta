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

class NumberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', result: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    var form = new FormData();
    form.append("number", this.state.value);

    fetch("https://hackathon-imta.osc-fr1.scalingo.io/api/multiply2", {
      method: "PUT",
      body: form
    })
      .then(res => res.json())
      .then(
        (res) => {
          console.log("HI");
          this.setState((state, props) => (
              {result: res.result}
            )
          )
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
