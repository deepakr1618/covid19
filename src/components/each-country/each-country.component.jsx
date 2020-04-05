import React from 'react';
import './each-country.style.scss';
import {withRouter} from 'react-router-dom'
import { Line } from 'react-chartjs-2';

class EachCountry extends React.Component {
    constructor(props){
        super(props)
        this.props = props
        const {country,status} = props.match.params
        this.state = { 
            cases:[] ,
            loaded:false,
            error:false,
            country,
            status
        }
    }
    async componentDidMount(){
        console.log("Component mounted!")
        const {country , status} = this.state
        const res = await fetch(`https://api.covid19api.com//country/${country}/status/${status}/live`)
        const data = await res.json()
        this.dates = data.map(({Date})=>Date.split("T")[0])
        this.cases = data.map(({Cases})=>Cases)
        this.increment = [];
        for(let i=0;i<this.cases.length;i++){
            var diff;
            if(i===0){
                diff =0
            }else{
                diff = this.cases[i] - this.cases[i-1]
                diff = diff*100
            }
            this.increment.push(diff)
        }
        this.setState({
            data:{
                labels: this.dates,
                datasets:[
                    {
                        label: `${status.toUpperCase()}`,
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderWidth: 1,
                        borderColor:"#333",
                        data: this.cases ,
                        pointRadius:4,
                        pointBorderWidth:0,
                        pointBackgroundColor:"#333"
                    }

                ]
            },
            status,
            loaded:true
        },()=>{
            console.log("Data was succesfully fetched!")
        })
    }

    handleOptionChange = (e)=>{
        const value = e.target.value
        this.props.history.push(`/${this.state.country}/${value}`)
    }


    render(){
        return(
            <div className="each-country">
                <div className="status">
                    {`${this.state.status==="confirmed"?"CONFIRMED":this.state.status==="recovered"?"RECOVERED":"DEATH"}`} rate in {this.state.country}
                </div>

                <select className="option" onChange={this.handleOptionChange} value={this.state.status}>
                    <option value="deaths" >Deaths</option>
                    <option value="confirmed" >Confirmed</option>
                    <option value="recovered" >Recovered</option>
                </select>


                {!this.state.loaded ? 
                    <div>Loading...</div>:null
                }
                
                {
                    this.state.loaded ?
                            <div className="main-container">
                                <div className="graph-container">
                                <Line
                                data={this.state.data}
                                options={{
                                    responsive:true,
                                    legend:{
                                        display:false
                                    },
                                    yAxes: [{
                                        type: 'logarithmic'
                                    }]
                                }}/>
                                </div>
                                <div className="data-container">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>Dates</td>
                                            <td>{this.state.status.substr(0,1).toUpperCase()+this.state.status.substr(1,this.state.status.length)}</td>
                                            <td>Changed : </td>
                                        </tr>
                                        {
                                            this.dates.map((date , i)=>{
                                                let caseNo = this.cases[i]
                                                let roc = this.increment[i]
                                                return(
                                                    <tr key={i} style={{
                                                        background:`rgb(255,${255-((roc-200)/255)},${255-((roc-200)/255)})`
                                                    }}>
                                                        <td>{date}</td>
                                                        <td>{caseNo}</td>
                                                        <td>by {roc} % of day before</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                    :null
                }
            </div>
        )
    }
}

export default withRouter(EachCountry);
