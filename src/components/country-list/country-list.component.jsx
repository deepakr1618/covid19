import React from 'react'
import CountryPreview from '../country-preview/country-preview.component'
import './country-list.style.scss'
export default class CountryList extends React.Component{
    constructor(props){
        super(props)
        this.status = "deaths"
        this.state = {
          search:"",
          showOverlay:false
        }
    }

    handleChange = (e)=>{
      const {value} = e.target
      this.setState((state)=>{
        return({
          ...state,
          search: value
        })
      })
    }

    toggleOverlay = () =>{
      this.setState((state)=>{
        return({
          ...state ,
          showOverlay : !state.showOverlay
        })
      })
    }
    

    render(){
        let newList = this.props.countryList;
        newList = newList.filter(({Country})=>{
          return Country.toUpperCase().includes(this.state.search.toUpperCase())
        })
        return(
            <div className="container-wrapper">
              <div className={this.state.showOverlay ? `overlay opened`:`overlay`}>

              </div>
              <h1>Covid-19 Monitor and Visualizer</h1>
              <h2>Search for a country</h2>
              <div className="input_wrapper">
                <input type="text" onChange={this.handleChange} value={this.state.search} name="search"/>
                <label htmlFor="search">Search</label>
              </div>
              
              <div className="coutainer-list">
              {
                  newList.map((data)=>{
                    if(data.Country.length===0) return (null)
                    return(
                      <CountryPreview {...data} overlayHandler={this.toggleOverlay} key={data.Country}></CountryPreview>
                    )
                  })
              }
              </div>
            </div>
            
        )
    }
}