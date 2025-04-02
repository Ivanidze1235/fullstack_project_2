import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function Cohort(){
    const [students, setStudents] = useState(null)
    const [cohort, setCohort] = useState(null)

    let location = useLocation()
    location = new URLSearchParams(location.search)
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
        }, [])
    
    useEffect(()=> {
        fetch("http://127.0.0.1:8000//api/student/?cohort=" + code)
                .then((res) => res.json())
                .then(data => {
                  setStudents(data)
                  console.log(data)
                })
                .catch((err) => console.error(err))
        }, [])

        const listStudents = () => {
            if(students != null){
                console.log("students")
                console.log(students)
              let list = students.map(el => <li className="py-4 text-slate-800 font-bold uppercase text-right" key={el.student_id}>Student: {el.student_id}, {el.first_name} <Link className="text-blue-500" to={`/student/?id=${el.student_id}`}>View Student</Link></li>)
              return list;
            }
          }
    if (students != null && cohort != null) {
        return(
        <div className="flex bg-gray-100 min-h-screen">
            <div className="flex-col w-64 bg-gray-800">
              <p className="flex items-center justify-center h-16 bg-gray-900 text-blue-50 w-full">{cohort.name}</p>
              <p className="flex items-center justify-center h-16 bg-gray-900 text-blue-50 w-full">Code: {cohort.id}</p>
              <Link className="text-blue-500" to={"/cohort/modules/?cohort="+cohort.id}><button className="flex items-center justify-center h-16 bg-gray-900 w-full">Go to modules delivered to cohort</button></Link>
              <Link className="text-blue-500" to={"/cohorts"}><button className="flex items-center justify-center h-16 bg-gray-900 w-full">Go to cohorts</button></Link>
            </div>
              
              <ul className="divide-y divide-gray-300 mt-5 ml-auto mr-5 px-4 border min-w-96">
                {listStudents()}
              </ul>
              
          </div>
            
        );    
    }
    
}

export default Cohort;