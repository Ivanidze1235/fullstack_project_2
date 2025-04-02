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
            let list = cohortData.map(el => <li className="py-4 text-slate-800 font-bold uppercase text-right" key={el.id}>{el.name} <Link className="text-blue-500" to={`/cohort/?code=${el.id}`}>Go to {el.id}</Link></li>)
            return list;
        }
        
    }
    return(
        <div className="flex bg-gray-100 min-h-screen">
            <div className="flex-col w-64 bg-gray-800">
                <Link className="text-blue-500" to={"/newcohort"}><button className="flex items-center justify-center h-16 bg-gray-900 w-full">Add new cohort</button></Link>
                <Link className="text-blue-500" to={"/"}><button className="flex items-center justify-center h-16 bg-gray-900 w-full">Go home</button></Link>
            </div>
            
            <ul className="divide-y divide-gray-300 mt-5 ml-auto mr-5 px-4 border min-w-96">
                <p className="py-4 text-slate-700 font-bold uppercase text-left">List of Cohorts</p>
                {listCohortLinks()}
            </ul>
            
        </div>
        
    )        
}

export default Cohorts