import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Select from 'react-select'

function NewModule(){
    const [code, setCode] = useState("")
    const [fullname, setFullname] = useState("")
    const [delivered, setDelivered] = useState([])
    const [split, setSplit] = useState(0)
    const [cohorts, setCohorts] = useState([])

    const navigate = useNavigate()

    const postModule = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/api/module/", {
    
            // Adding method type
            method: "POST",
            mode: "cors",
            // Adding body or contents to send
            body: JSON.stringify({
                code: code,
                full_name: fullname,
                delivered_to: delivered,
                ca_split: split, 
            }),
            
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        
        // Converting to JSON
        .then(response => response.json())
        navigate("/modules");
    }
    useEffect(()=> {
        fetch("http://127.0.0.1:8000/api/cohort/")
              .then((res) => res.json())
              .then(data => {
                setCohorts(data)
              })
              .catch((err) => console.error(err))
        }, [])


    const listCohorts = () => {
        if(cohorts.length > 0){
            let list = cohorts.map(el => ({value: `http://localhost:8000/api/cohort/${el.id}/`, label: el.name}))

            return list
        }
    }

    return(
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form onSubmit={postModule}>
                    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="cohorts">Select cohorts: </label>
                    <Select className="w-full border-[#e0e0e0] bg-white text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" name="cohorts" options={listCohorts()} isMulti onChange={(cohorts) => setDelivered(cohorts.map(el => el.value))}></Select>
                    {console.log(delivered)}
                    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="code">Enter module code: </label>
                    <input className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" name="code" type="text"
                        value={code}
                        onChange={(code) => setCode(code.target.value)}
                    />
                    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="name">Enter name: </label>
                    <input className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" name="name" type="text"
                        value={fullname}
                        onChange={(name) => setFullname(name.target.value)}
                    />

                    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="split">Enter CA split: </label>
                    <input className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" name="split" type="text"
                        value={split}
                        onChange={(split) => setSplit(split.target.value)}
                    />
                    <button className="hover:shadow-form w-full mt-5 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
        
    )
}

export default NewModule