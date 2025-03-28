import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

function NewCohort(){
    const [id, setID] = useState("")
    const [year, setYear] = useState(0)
    const [degree, setDegree] = useState("")
    const [cohorts, setCohorts] = useState(null)

    const navigate = useNavigate()

    const postDegree = (e) => {
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
        <form onSubmit={postDegree}>
            <label>Select degree: </label>
            <select name="degrees" onChange={(degree) => setDegree(degree.target.value)}>
                {listDegrees()}
            </select>
            <label>enter ID: </label>
            <input  type="text"
                    value={id}
                    onChange={(id) => setID(id.target.value)}
            />
            <label>enter year: </label>
            <input  type="text"
                    value={year}
                    onChange={(year) => setYear(year.target.value)}
            />
            
            <button type="submit">
                Submit
            </button>
        </form>
    )
}

export default NewCohort