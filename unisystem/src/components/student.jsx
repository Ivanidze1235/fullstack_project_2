import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function Student(){

    const [student, setStudent] = useState(null)
    const [modules, setModules] = useState(null)

    let location = useLocation();
    location = new URLSearchParams(location.search);
    let stud = location.get("id")

    useEffect(()=> {
        fetch("http://127.0.0.1:8000/api/student/" + stud)
                .then((res) => res.json())
                .then(data => {
                  setStudent(data)

                  let url = new URL(data.cohort)
                  console.log("URL: ", url)
                  url = url.pathname.split("/")
                  let cohort = url[url.length - 2]
                  console.log(cohort)
                  fetch("http://127.0.0.1:8000/api/module/?delivered_to=" + cohort)
                      .then((res) => res.json())
                      .then(data => {
                          console.log(data)
                          setModules(data)
                      })

                })
                .catch((err) => console.error(err))
        }, [stud])


    const listModules = () => {
        if(modules != null)
        {let list = modules.map(el => <li key={el.code}><Link to={`/module/?module=${el.code}`}>{el.code}</Link> {el.full_name}</li>)
        return list}
    }

    if (student != null) {
        return(
            <div>
                <p>ID: {student.student_id}</p>
                <p>Name: {student.first_name} {student.last_name}</p>
                {listModules()}
                <p><Link to={"/newstudent"}>Create new student</Link></p>
                <p><Link to={"/cohorts"}>Go to cohorts</Link></p>
            </div>  
        );    
    }
    
}

export default Student;