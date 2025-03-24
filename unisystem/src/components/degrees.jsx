import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";
import Home from "./home";
import Degree from "./degree";
function Degrees(data){
    
    const listDegreeLinks = () => {
        if(data != null){
            console.log(data)
            let list = data.map(el => <li><Link to={`/degree/${el.shortcode}`}>Go to {el.shortcode}</Link></li>)
            return list;
        }
        
    }
    return(
        <div>
            <p>List of degrees</p>
            <ul>
                {listDegreeLinks()}
                <Link to={"/"}>Go home</Link>
            </ul>
            
        </div>
        
    )        
}

export default Degrees