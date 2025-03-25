import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function Cohort(){
    const [students, setStudents] = useState(null)
    const [cohort, setCohort] = useState(null)

    let location = useLocation();
    location = new URLSearchParams(location.search);
    let code = location.get("code")
    
    useEffect(()=> {
        console.log("cohort")
        console.log(cohort)
        fetch("http://127.0.0.1:8000//api/cohort/" + code)
                .then((res) => res.json())
                .then(data => {
                  setCohort(data)
                  console.log(data)
                })
                .catch((err) => console.error(err))
        }, [code, cohort])
    
    useEffect(()=> {
        console.log("cohort")
        console.log(cohort)
        fetch("http://127.0.0.1:8000//api/student/?cohort=" + code)
                .then((res) => res.json())
                .then(data => {
                  setStudents(data)
                  console.log(data)
                })
                .catch((err) => console.error(err))
        }, [code, cohort])

        const listStudents = () => {
            if(students != null){
                console.log("students")
                console.log(students)
              let list = students.map(el => <li>Student: {el.student_id}, {el.first_name} <Link to={`/student/?id=${el.student_id}`}>View Student</Link></li>)
              return list;
            }
          }
    if (students != null && cohort != null) {
        return(
            <div>
                <p>ID: {cohort.id}</p>
                <p>Year: {cohort.year}</p>
                <p>{cohort.name}</p>
                <ul>
                    {listStudents()}
                </ul>
                <Link to={"/cohorts"}>Go to cohorts</Link>
            </div>
            
        );    
    }
    
}

export default Cohort;