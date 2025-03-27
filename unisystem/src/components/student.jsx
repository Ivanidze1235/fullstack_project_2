import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function Student(){

    const [student, setStudent] = useState(null)
    let location = useLocation();
    location = new URLSearchParams(location.search);
    let stud = location.get("id")

    useEffect(()=> {
        fetch("http://127.0.0.1:8000/api/student/" + stud)
                .then((res) => res.json())
                .then(data => {
                  setStudent(data)
                })
                .catch((err) => console.error(err))
                console.log(student)
        }, [stud])
    if (student != null) {
        return(
            <div>
                <p>ID: {student.student_id}</p>
                <p>Name: {student.first_name} {student.last_name}</p>
                <Link to={"/cohorts"}>Go to cohorts</Link>
            </div>  
        );    
    }
    
}

export default Student;