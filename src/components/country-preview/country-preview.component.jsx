import React from 'react'
import {Link} from 'react-router-dom'
import './country-preview.styles.scss'
import {useState} from 'react'
import {ReactComponent as Arrow } from '../assets/down.svg';


export default function CountryPreview(props){
    const {Country , Slug} = props
    
    const [open , toggleOpen] = useState(false)
    const [{confirmed , recovered , deaths } , updateCases] = useState({confirmed : "Loading.." , recovered : "Loading..", deaths : "Loading.."})

    async function fetchData(){
        const res = await fetch(`https://corona.lmao.ninja/countries/${Country}`)
        const data = await res.json()
        return data
    }

    function toggleView(){
        props.overlayHandler()
        toggleOpen((curr)=>!curr)
        Promise.all([fetchData()]).then((data)=>{
            data = data[0]
            let confirmed = data.cases
            let recovered = data.deaths
            let deaths = data.recovered
            let flag = data.countryInfo.flag
            updateCases({confirmed , recovered , deaths })
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    
    try{
        return(
            <div className={open ? `link-container opened` : `link-container `} onClick={toggleView}>
                <div className="nameWrapper">
                    <h2>{Country}</h2>
                    <Arrow className={open ? `arrow opened` : `arrow `}></Arrow>
                </div>
                <div className="details">
                    <p>Deaths : {deaths}</p>
                    <p>Confirmed : {confirmed}</p>
                    <p>Recovered : {recovered}</p>
                    <Link className="links" to={`/${Slug}/confirmed`}>Open graph <Arrow className="arrow"></Arrow></Link>
                </div>
            </div>
        )
    }
    catch(err){
        return(
            <div>{err}</div>
        )
    }
}