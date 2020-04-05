import React from 'react'
import './apis.styles.scss'


export default function Api(){
    return(
        <div className="api">
            <h1>
                APIs Used to fetch the data.
            </h1>
            <div className="eachApi">
                <h4>To fetch time series data : </h4>
                <a href="https://api.covid19api.com/">https://api.covid19api.com/</a>
            </div>
            <div className="eachApi">
                <h4>To fetch number of cases : </h4>
                <a href="https://corona.lmao.ninja">https://corona.lmao.ninja</a>
            </div>
            <h3 style={{
                textAlign:"center",
                textTransform:"uppercase",
                color:"red"
            }}>!!!  The sole reason I built this project was to put some react concepts into use. This inclues useState , class States , React Router DOM !!!</h3>
        </div>
    )
}