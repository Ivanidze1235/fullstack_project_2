import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function Cohort(cohort){
    // const [cohorts, setCohorts] = useState(null)
    // useEffect(()=> {
    //     fetch("http://127.0.0.1:8000/api/cohort/?degree=" + deg.deg.shortcode)
    //             .then((res) => res.json())
    //             .then(data => {
    //               setCohorts(data)
    //               console.log(data)
    //             })
    //             .catch((err) => console.error(err))
    //     }, [])

    //     const listCohorts = () => {
    //         if(cohorts != null){
    //           let list = cohorts.map(el => <li>Cohort ID: {el.id}, {el.name}<Link to={`/cohort/${el.id}`}>View Cohort</Link></li>)
    //           return list;
    //         }
    //       }
    
    return(
        <div>
            <p>ID: {cohort.deg.id}</p>
            <p>Year: {cohort.deg.year}</p>
            <p>{cohort.deg.name}</p>
            <Link to={"/cohort"}>Go to cohorts</Link>
        </div>
        
    );
}

export default Cohort;