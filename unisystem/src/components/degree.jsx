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
              let list = cohorts.map(el => <li className="py-4 text-slate-800 font-bold uppercase text-right" key={el.id}>Cohort ID: {el.id}, {el.name} <Link className="text-blue-500" to={`/cohort/?code=${el.id}`}>View Cohort</Link></li>)
              return list;
            }
          }
          console.log(degree)
    if (degree != null && cohorts != null) {
      return(
        <div className="flex bg-gray-100 min-h-screen">
          <div className="flex-col w-64 bg-gray-800">
            <p className="flex items-center justify-center h-16 bg-gray-900 text-blue-50 w-full">{degree.full_name}</p>
            <p className="flex items-center justify-center h-16 bg-gray-900 text-blue-50 w-full">Code: {degree.shortcode}</p>
            <Link className="text-blue-500" to={"/degrees"}><button className="flex items-center justify-center h-16 bg-gray-900 w-full">Go to degrees</button></Link>
          </div>
            
            <ul className="divide-y divide-gray-300 mt-5 ml-auto mr-5 px-4 border min-w-96">
              {listCohorts()}
            </ul>
            
        </div>
        
    );  
    }
    
}

export default Degree;