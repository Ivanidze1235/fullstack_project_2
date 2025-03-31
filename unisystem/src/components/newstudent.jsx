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
        <form onSubmit={postStudent}>
            <label htmlFor="cohorts">Select cohort: </label>
            <select name="cohorts" onChange={(degree) => setCohort(degree.target.value)}>
                {listCohorts()}
            </select>
            <label htmlFor="id">enter ID (8 digits): </label>
            <input name="id" type="text"
                    value={id}
                    onChange={(id) => setID(id.target.value)}
            />
            <label htmlFor="first">enter first name: </label>
            <input name="first" type="text"
                    value={fname}
                    onChange={(fname) => setFName(fname.target.value)}
            />
            <label htmlFor="last">enter last name: </label>
            <input name="last" type="text"
                    value={lname}
                    onChange={(lname) => setLName(lname.target.value)}
            />

            <button type="submit">
                Submit
            </button>
        </form>
    )
}

export default NewStudent