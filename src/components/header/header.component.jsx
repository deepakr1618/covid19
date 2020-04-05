import React from 'react'
import './header.styles.scss'
import {Link} from 'react-router-dom'
import {ReactComponent as Home} from '../assets/home.svg'
import {ReactComponent as Resources} from '../assets/support.svg'


export default function Header(){
    return(
        <div className="header">
            <Link to="/" className="link">
                <Home className="home"></Home>
                <h3>Home</h3>
            </Link>
            <Link to="/api" className="link">
                <Resources className="apis"></Resources>
                <h3>APIs Used</h3>
            </Link>
        </div>
    )
}