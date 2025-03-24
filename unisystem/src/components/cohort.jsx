import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function Cohort(cohort){
    const [students, setStudents] = useState(null)
    useEffect(()=> {
        fetch("http://127.0.0.1:8000//api/student/?cohort=" + cohort.deg.id)
                .then((res) => res.json())
                .then(data => {
                  setStudents(data)
                  console.log(data)
                })
                .catch((err) => console.error(err))
        }, [])

        const listStudents = () => {
            if(students != null){
              let list = students.map(el => <li>Student: {el.student_id}, {el.first_name}<Link to={`/student/${el.student_id}`}>View Student</Link></li>)
              return list;
            }
          }
    
    return(
        <div>
            <p>ID: {cohort.deg.id}</p>
            <p>Year: {cohort.deg.year}</p>
            <p>{cohort.deg.name}</p>
            <ul>
                {listStudents()}
            </ul>
            <Link to={"/cohort"}>Go to cohorts</Link>
        </div>
        
    );
}

export default Cohort;