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

    const postDegree = (e) => {
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
        <form onSubmit={postDegree}>
            <label htmlFor="cohorts">Select cohorts: </label>
            <Select name="cohorts" options={listCohorts()} isMulti onChange={(cohorts) => setDelivered(cohorts.map(el => el.value))}></Select>
            {console.log(delivered)}
            <label htmlFor="code">enter module code: </label>
            <input name="code" type="text"
                    value={code}
                    onChange={(code) => setCode(code.target.value)}
            />
            <label htmlFor="name">enter name: </label>
            <input name="name" type="text"
                    value={fullname}
                    onChange={(name) => setFullname(name.target.value)}
            />

            <label htmlFor="split">enter CA split: </label>
            <input name="split" type="text"
                    value={split}
                    onChange={(split) => setSplit(split.target.value)}
            />

            <button type="submit">
                Submit
            </button>
        </form>
    )
}

export default NewModule