import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

function Cohorts(data){
    
    const listCohortLinks = () => {
        if(data != null){
            console.log("this is data")
            console.log(data.data)
            let list = data.data.map(el => <li><Link to={`/cohort/${el.id}`}>Go to {el.id}</Link></li>)
            return list;
        }
        
    }
    return(
        <div>
            <p>List of Cohorts</p>
            <ul>
                {listCohortLinks()}
                <Link to={"/"}>Go home</Link>
            </ul>
            
        </div>
        
    )        
}

export default Cohorts