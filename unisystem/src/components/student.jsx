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
        {let list = modules.map(el => <li className="py-4 text-slate-800 font-bold uppercase text-right" key={el.code}><Link className="text-blue-500" to={`/module/?module=${el.code}`}>{el.code}</Link> {el.full_name}</li>)
        return list}
    }

    const listGrades = () => {
        if (grades != null) {
            let list = grades.map(el => 
            <li className="py-4 text-slate-800 font-bold uppercase text-right" key={el.id}>
                <p>{el.module.split("/")[el.module.split("/").length - 2]}</p> 
                <p>CA: {el.ca_mark}</p>
                <p>Exam: {el.exam_mark}</p>
            </li>)
            return list
        }
    }

    if (student != null) {
        return(
            <div className="flex bg-gray-100 min-h-screen min-w-[30%]">
                <div className="flex-col w-64 bg-gray-800">
                    <p className="flex items-center justify-center h-16 bg-gray-900 text-blue-50 w-full">ID: {student.student_id}</p>
                    <p className="flex items-center justify-center h-16 bg-gray-900 text-blue-50 w-full">Name: {student.first_name} {student.last_name}</p>
                    <Link className="text-blue-500" to={"/setgrade/?id="+student.student_id}><button className="flex items-center justify-center h-16 bg-gray-900 w-full">Set student grade</button></Link>
                    <Link className="text-blue-500" to={"/newstudent"}><button className="flex items-center justify-center h-16 bg-gray-900 w-full">Create new student</button></Link>
                    <Link className="text-blue-500" to={"/cohorts"}><button className="flex items-center justify-center h-16 bg-gray-900 w-full">Go to cohorts</button></Link>
                </div>
                
                <ul className="divide-y divide-gray-300 mt-5 ml-auto mr-5 px-4 border min-w-[50%]">
                    <li className="py-4 text-slate-800 font-bold uppercase text-right">Modules:</li>
                    {listModules()}
                </ul>
                <ul className="divide-y divide-gray-300 mt-5 ml-auto mr-5 px-4 border min-w-[20%]">
                    <li className="py-4 text-slate-800 font-bold uppercase text-right">Grades:</li>
                    {listGrades()}
                </ul>
                
            </div>  
        );    
    }
    
}

export default Student;