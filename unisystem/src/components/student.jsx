import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function Student(){

    const [student, setStudent] = useState(null)
    const [modules, setModules] = useState(null)
    const [grades, setGrades] = useState(null)

    let location = useLocation();
    location = new URLSearchParams(location.search);
    let stud = location.get("id")

    useEffect(()=> {
        fetch("http://127.0.0.1:8000/api/student/" + stud)
                .then((res) => res.json())
                .then(data => {
                    setStudent(data)
                    
                fetch("http://127.0.0.1:8000/api/grade/?student="+data.student_id)
                    .then((res) => res.json())
                    .then(grades => {
                        setGrades(grades)
                    })
                    .catch((err) => console.error(err))

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

    const listGrades = () => {
        if (grades != null) {
            let list = grades.map(el => 
            <li key={el.id}>
                <p>{el.module.split("/")[el.module.split("/").length - 2]}</p> 
                <p>CA: {el.ca_mark}</p>
                <p>Exam: {el.exam_mark}</p>
            </li>)
            return list
        }
    }

    if (student != null) {
        return(
            <div>
                <p>ID: {student.student_id}</p>
                <p>Name: {student.first_name} {student.last_name}</p>
                <ul>
                    {listModules()}
                </ul>
                <ul>
                    {listGrades()}
                </ul>
                <p><Link to={"/setgrade/?id="+student.student_id}>Set student grade</Link></p>
                <p><Link to={"/newstudent"}>Create new student</Link></p>
                <p><Link to={"/cohorts"}>Go to cohorts</Link></p>
            </div>  
        );    
    }
    
}

export default Student;