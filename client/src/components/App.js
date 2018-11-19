import React, { Component } from 'react';
import '../css/App.css';
import ReactDOM from "react-dom";
import axios from "axios";
import Add from "./Add"



class App extends Component {
  state = {
    selectedMonth: "Jan",
    selectedYear: 2018,
    data: []
  }
  
  componentDidMount() {
    this.getData(this, "2018");
  }
  
  componentWillReceiveProps(nextProps) {
    this.getData(this, "2018");
  }
  
  getData = (ev, year) => {
    axios.get("/getAll?month=All&year="+year)
      .then(function(response){
        ev.setState({data: response.data});
        ev.setState({selectedYear: parseInt(year)})
      });
  }
  
  render() {
    return (
      <div>
        <Add 
          selectedMonth={this.state.selectedMonth}
          selectedYear={this.state.selectedYear} />
          <table>
            <thead>
              <tr>
                <th></th>
                <th className="desc-col">Description</th>
                <th className="button-col">Amount</th>
                <th className="button-col">Month</th>
                <th className="button-col">Year</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(function(exp){
                return (
                  <tr>
                    <td className="counterCell"></td>
                    <td className="desc-col">{exp.description}</td>
                    <td className="button-col">{exp.amount}</td>
                    <td className="button-col">{exp.month}</td>
                    <td className="button-col">{exp.year}</td>
                  </tr>
                )})
              }
            </tbody>
          </table>
        <header className="App-header">
          <h1>Expense Manager</h1>
        </header>
      </div>
    );
  }
}

export default App;
