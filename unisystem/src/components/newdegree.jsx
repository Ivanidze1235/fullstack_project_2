import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function NewDegree(){
    const [full_name, setName] = useState("")
    const [shortcode, setShortcode] = useState("")
    const navigate = useNavigate()

    const postDegree = (e) => {
        console.log(full_name, shortcode)
        e.preventDefault()
        fetch("http://localhost:8000/api/degree/", {
    
            // Adding method type
            method: "POST",
            mode: "cors",
            // Adding body or contents to send
            body: JSON.stringify({
                full_name: full_name,
                shortcode: shortcode
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
        navigate("/degrees");
    }

    return(
        <form onSubmit={postDegree}>
            <label>enter full degree name: </label>
            <input  type="text"
                    value={full_name}
                    onChange={(name) => setName(name.target.value)}
            />
            <label>enter shortcode: </label>
            <input  type="text"
                    value={shortcode}
                    onChange={(name) => setShortcode(name.target.value)}
            />
            
            <button type="submit">
                Submit
            </button>
        </form>
    )
}

export default NewDegree