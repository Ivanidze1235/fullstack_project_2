import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function Degree({deg}){
    const [cohorts, setCohorts] = useState(null)
    useEffect(()=> {
        fetch("http://127.0.0.1:8000/api/cohort/?degree=" + deg.shortcode)
                .then((res) => res.json())
                .then(data => {
                  setCohorts(data)
                  console.log(data)
                })
                .catch((err) => console.error(err))
        }, [])

        const listCohorts = () => {
            if(cohorts != null){
              let list = cohorts.map(el => <li>Cohort ID: {el.id}, {el.name}<Link to={`/cohort/${el.id}`}>View Cohort</Link></li>)
              return list;
            }
          }

    return(
        <div>
            <p>{deg.full_name}</p>
            <p>{deg.shortcode}</p>
            <ul>
                {listCohorts()}
            </ul>
            <Link to={"/degree"}>Go to degrees</Link>
        </div>
        
    );
}

export default Degree;