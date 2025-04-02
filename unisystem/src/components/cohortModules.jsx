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
            let list = modules.map(el => <li className="py-4 text-slate-800 font-bold uppercase text-right" key={el.code}><Link className="text-blue-500" to={`/module/?module=${el.code}`}>{el.code}</Link> {el.full_name}</li>)
            return list
        }
    }
console.log(modules)
    return(
        <div className="flex bg-gray-100 min-h-screen">
            <div className="flex-col w-64 bg-gray-800">
                <p className="flex items-center justify-center h-16 bg-gray-900 text-blue-50 w-full">Modules in {coh}</p>
                <Link className="text-blue-500" to={`/cohort/?code=${coh}`}> <button className="flex items-center justify-center h-16 bg-gray-900 w-full">Go back to {coh}</button></Link>
            </div>
            <ul className="divide-y divide-gray-300 mt-5 ml-auto mr-5 px-4 border min-w-96">
                {listModules()}
            </ul>
            
        </div>
    )
}

export default CohortModules