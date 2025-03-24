import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function Student({student}){
    // const [students, setStudents] = useState(null)
    // useEffect(()=> {
    //     console.log("cohort")
    //     console.log(cohort)
    //     fetch("http://127.0.0.1:8000//api/student/?cohort=" + cohort.id)
    //             .then((res) => res.json())
    //             .then(data => {
    //               setStudents(data)
    //               console.log(data)
    //             })
    //             .catch((err) => console.error(err))
    //     }, [])

    //     const listStudents = () => {
    //         if(students != null){
    //             console.log("students")
    //             console.log(students)
    //           let list = students.map(el => <li>Student: {el.student_id}, {el.first_name}<Link to={`/student/${el.student_id}`}>View Student</Link></li>)
    //           return list;
    //         }
    //       }
    
    return(
        <div>
            <p>ID: {student.student_id}</p>
            <p>Name: {student.first_name} {student.last_name}</p>
            <Link to={"/cohort"}>Go to cohorts</Link>
        </div>
        
    );
}

export default Student;