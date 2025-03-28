import { Link } from "react-router";
import { useState } from 'react';
import { useEffect } from 'react';

function Cohorts(){

    const [cohortData, setCohortData] = useState(null)
        useEffect(()=> {
          fetch("http://localhost:8000/api/cohort")
                  .then((res) => res.json())
                  .then(data => {
                    setCohortData(data)
                    console.log(cohortData)
                  })
                  .catch((err) => console.error(err))
          }, [])
    
    const listCohortLinks = () => {
        if(cohortData != null){
            console.log("this is data")
            console.log(cohortData)
            let list = cohortData.map(el => <li key={el.id}>{el.id} <Link to={`/cohort/?code=${el.id}`}>Go to {el.id}</Link></li>)
            return list;
        }
        
    }
    return(
        <div>
            <p>List of Cohorts</p>
            <ul>
                {listCohortLinks()}
                <p><Link to={"/newcohort"}>Make new cohort</Link></p>
                <p><Link to={"/"}>Go home</Link></p>
            </ul>
            
        </div>
        
    )        
}

export default Cohorts