import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router"

function SetGrade(){
    const [module, setModule] = useState("")
    const [ca_mark, setCA] = useState(0)
    const [exam_mark, setExam] = useState(0)
    const [cohort, setCohort] = useState("")

    const [modules, setModules] = useState(null)

    const navigate = useNavigate()

    let location = useLocation();
    location = new URLSearchParams(location.search);
    let stud = location.get("id")

    const setGrade = (e) => {
        e.preventDefault()
        if (modules.length !== 0) {
            console.log("module: ", module)
            console.log("ca mark: ", ca_mark)
            console.log("exam mark: ", exam_mark)
            console.log("cohort: ", cohort)
            fetch("http://localhost:8000/api/grade/", {
        
                // Adding method type
                method: "POST",
                mode: "cors",
                // Adding body or contents to send
                body: JSON.stringify({
                    module: module,
                    ca_mark: ca_mark,
                    exam_mark: exam_mark,
                    cohort: cohort,
                    student: "http://127.0.0.1:8000/api/student/"+stud+"/", 
                }),
                
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            
            // Converting to JSON
            .then(response => response.json())
            
            // Displaying results to console
            .then(json => console.log(json));
            navigate("/student/?id="+stud);
        }
       
    }
    useEffect(()=> {
        fetch("http://127.0.0.1:8000/api/student/"+stud+"/")
            .then((res) => res.json())
            .then(data => {
                console.log("Student data: ", data)
                setCohort(data.cohort)
                let url = new URL(data.cohort)
                url = url.pathname.split("/")
                let cohortcode = url[url.length - 2]
                fetch("http://127.0.0.1:8000/api/module/?delivered_to="+cohortcode)
                    .then((res) => res.json())
                    .then(module => {
                        setModules(module)
                        setModule("http://localhost:8000/api/module/" + module[0].code + "/")
                    })
                    .catch((err) => console.error(err))
            })
            .catch((err) => console.error(err))
        }, [stud])
    
    useEffect(
        () => {
            console.log("Received modules: ", modules)
        }, [modules]
    )

        

    const listModules = () => {
        if(modules != null){
            let list = modules.map(el => <option key={el.code} value={`http://localhost:8000/api/module/${el.code}/`}>{el.full_name}</option>)

            return list
        }
    }

    return(
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form onSubmit={setGrade}>
                    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="modules">Select module: </label>
                    <select className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" name="modules" onChange={(module) => setModule(module.target.value)}>
                        {listModules()}
                    </select>
                    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="ca">Enter ca mark: </label>
                    <input className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" type="text"
                        name="ca"
                        value={ca_mark}
                        onChange={(ca) => setCA(ca.target.value)}
                    />
                    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="exam">Enter exam mark: </label>
                    <input className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" type="text"
                        name="exam"
                        value={exam_mark}
                        onChange={(exam) => setExam(exam.target.value)}
                    />

                    <button className="hover:shadow-form w-full mt-5 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
        
    )
}

export default SetGrade