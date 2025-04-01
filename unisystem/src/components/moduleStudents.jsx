import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ModuleStudents() {
    let location = useLocation();
    location = new URLSearchParams(location.search);
    let mod = location.get("module")
    console.log(mod)

    const [module, setModule] = useState(null)
    const [students, setStudents] = useState([])
    let cohorts = []

     
    const getAllCohorts = () =>{
        if(module != null){
            module.delivered_to.forEach(element => {
                let url = new URL(element)
                let cohort_code = url.pathname.split("/")
                cohorts.push(cohort_code[cohort_code.length - 2])
            });
            console.log(cohorts)
            if (students.length === 0) {
                cohorts.forEach(el => {
                    fetch("http://127.0.0.1:8000/api/student/?cohort=" + el)
                    .then((res) => res.json())
                    .then(data => {
                        setStudents(students => [...students, ...data])
                  })
                  .catch((err) => console.error(err))    
                });
                    
            }
        }
    }
    const displayStudents = () => {
        if(students.length !== 0){
            let list = students.map(el => <li>{el.first_name} {el.last_name} ID: <Link className="text-blue-500" to={`/student/?id=${el.student_id}`}>{el.student_id}</Link></li>)
            return list
        }
    }

    useEffect(()=> {
          fetch("http://127.0.0.1:8000/api/module/" + mod)
                  .then((res) => res.json())
                  .then(data => {
                    setModule(data)
                    console.log(module)
                  })
                  .catch((err) => console.error(err))
          }, [mod])

    getAllCohorts()
    console.log(students)
    return(
        <div>
            <p>Module: {mod}</p>
            <ul>
                {displayStudents()}
            </ul>
            <Link className="text-blue-500" to={"/module/?module=" + mod}>Go to module {mod}</Link>
        </div>
    )
}

export default ModuleStudents