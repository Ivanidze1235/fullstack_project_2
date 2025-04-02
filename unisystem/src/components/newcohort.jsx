import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

function NewCohort(){
    const [id, setID] = useState("")
    const [year, setYear] = useState(0)
    const [degree, setDegree] = useState("")
    const [cohorts, setCohorts] = useState(null)

    const navigate = useNavigate()

    const postCohort = (e) => {
        e.preventDefault()
        console.log(degree)
        fetch("http://localhost:8000/api/cohort/", {
    
            // Adding method type
            method: "POST",
            mode: "cors",
            // Adding body or contents to send
            body: JSON.stringify({
                id: id,
                year: year,
                degree: degree, 
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
        navigate("/cohorts");
    }
    useEffect(()=> {
        fetch("http://127.0.0.1:8000/api/degree/")
              .then((res) => res.json())
              .then(data => {
                console.log(data)
                setCohorts(data)
              })
              .catch((err) => console.error(err))
        }, [])
    

    const listDegrees = () => {
        if(cohorts != null){
            let list = cohorts.map(el => <option value={`http://localhost:8000/api/degree/${el.shortcode}/`}>{el.full_name}</option>)

            return list
        }
    }

    return(
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form onSubmit={postCohort}>
                    <label className="mb-3 block text-base font-medium text-[#07074D]">Select degree: </label>
                    <select className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" name="degrees" onChange={(degree) => setDegree(degree.target.value)}>
                        {listDegrees()}
                    </select>
                    <label className="mb-3 block text-base font-medium text-[#07074D]">Enter ID: </label>
                    <input className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" type="text"
                        value={id}
                        onChange={(id) => setID(id.target.value)}
                    />
                    <label className="mb-3 block text-base font-medium text-[#07074D]">Enter year: </label>
                    <input className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" type="text"
                        value={year}
                        onChange={(year) => setYear(year.target.value)}
                    />
                    <div>
                        <button type="submit" className="hover:shadow-form w-full mt-5 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                        Submit
                    </button>
                    </div>
                    
                </form>
            </div>
        </div>
        
    )
}

export default NewCohort