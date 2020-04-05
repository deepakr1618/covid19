import React from 'react';
import './App.css';
import EachCountry from './components/each-country/each-country.component'
import CountryList from './components/country-list/country-list.component'
import Header from './components/header/header.component'
import Api from './components/apis/apis.component'
import {Switch , Route } from 'react-router-dom'


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      countryList : []
    }
  }
  componentDidMount(){
    fetch("https://api.covid19api.com/countries")
    .then(res=>res.json())
    .then(data=>{
      this.setState({countryList:data})
    })
  }
  render(){
    return (
      <div className="coutainer-list-container">
      <Header></Header>
      <Switch>
        <Route exact path="/" component={(props)=>{
          return(<CountryList countryList={this.state.countryList}></CountryList>)
        }}/>

        <Route exact path="/:country/:status" render={(props)=>{return (<EachCountry></EachCountry>)}}/>
        <Route exact path="/api" component={Api}></Route>
      </Switch> 
      </div>
      
    )
  }
}

export default App;
