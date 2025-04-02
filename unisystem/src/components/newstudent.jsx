import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

function NewStudent(){
    const [id, setID] = useState("")
    const [fname, setFName] = useState("")
    const [lname, setLName] = useState("")
    const [cohort, setCohort] = useState(null)
    const [cohorts, setCohorts] = useState(null)

    const navigate = useNavigate()

    const postStudent = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/api/student/", {
    
            // Adding method type
            method: "POST",
            mode: "cors",
            // Adding body or contents to send
            body: JSON.stringify({
                student_id: id,
                first_name: fname,
                last_name: lname,
                cohort: cohort, 
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
        navigate("/student/?id=" + id);
    }
    useEffect(()=> {
        fetch("http://127.0.0.1:8000/api/cohort/")
              .then((res) => res.json())
              .then(data => {
                console.log(data)
                setCohorts(data)
              })
              .catch((err) => console.error(err))
        }, [])
    

    const listCohorts = () => {
        if(cohorts != null){
            let list = cohorts.map(el => <option value={`http://127.0.0.1:8000/api/cohort/${el.id}/`}>{el.name}</option>)

            return list
        }
    }

    return(
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form onSubmit={postStudent}>
                    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="cohorts">Select cohort: </label>
                    <select className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" name="cohorts" onChange={(degree) => setCohort(degree.target.value)}>
                        {listCohorts()}
                    </select>
                    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="id">Enter ID (8 digits): </label>
                    <input className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" name="id" type="text"
                        value={id}
                        onChange={(id) => setID(id.target.value)}
                    />
                    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="first">Enter first name: </label>
                    <input className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" name="first" type="text"
                        value={fname}
                        onChange={(fname) => setFName(fname.target.value)}
                    />
                    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="last">Enter last name: </label>
                    <input className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" name="last" type="text"
                        value={lname}
                        onChange={(lname) => setLName(lname.target.value)}
                    />

                    <button className="hover:shadow-form w-full mt-5 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
        
    )
}

export default NewStudent