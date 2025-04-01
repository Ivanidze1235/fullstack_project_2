import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function Degree(){
    const [cohorts, setCohorts] = useState(null)
    const [degree, setDegree] = useState(null)


    let location = useLocation();
    location = new URLSearchParams(location.search);
    let deg = location.get("degree")
    useEffect(()=> {
      fetch("http://127.0.0.1:8000/api/degree/" + deg)
              .then((res) => res.json())
              .then(data => {
                setDegree(data)
              })
              .catch((err) => console.error(err))
      }, [deg])

    useEffect(()=> {
        fetch("http://127.0.0.1:8000/api/cohort/?degree=" + deg)
                .then((res) => res.json())
                .then(data => {
                  setCohorts(data)
                })
                .catch((err) => console.error(err))
        }, [deg])

        const listCohorts = () => {
            if(cohorts != null){
              let list = cohorts.map(el => <li key={el.id}>Cohort ID: {el.id}, {el.name} <Link className="text-blue-500" to={`/cohort/?code=${el.id}`}>View Cohort</Link></li>)
              return list;
            }
          }
          console.log(degree)
    if (degree != null && cohorts != null) {
      return(
        <div>
            <p>{degree.full_name}</p>
            <p>Code: {degree.shortcode}</p>
            <ul>
                {listCohorts()}
            </ul>
            <Link className="text-blue-500" to={"/degrees"}>Go to degrees</Link>
        </div>
        
    );  
    }
    
}

export default Degree;