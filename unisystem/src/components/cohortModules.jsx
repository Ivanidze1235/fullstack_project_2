import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function CohortModules() {
    let location = useLocation();
    location = new URLSearchParams(location.search);
    let coh = location.get("cohort")

    const [modules, setModules] = useState(null)

    useEffect(()=> {
        if (modules == null) {
            fetch("http://127.0.0.1:8000/api/module/?delivered_to=" + coh)
            .then((res) => res.json())
            .then(data => {
              setModules(data)
            })
            .catch((err) => console.error(err))
        }
          
          }, [])

    const listModules = () => {
        if (modules != null) {
            let list = modules.map(el => <li key={el.code}><Link to={`/module/?module=${el.code}`}>{el.code}</Link> {el.full_name}</li>)
            return list
        }
    }
console.log(modules)
    return(
        <div>
            <p>I am cohort modules</p>
            <ul>
                {listModules()}
            </ul>
            <Link to={`/cohort/?code=${coh}`}>Go back to {coh}</Link>
        </div>
    )
}

export default CohortModules