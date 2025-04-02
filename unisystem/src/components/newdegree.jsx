import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form onSubmit={postDegree}>
                    <label className="mb-3 block text-base font-medium text-[#07074D]">Enter full degree name: </label>
                    <input className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" type="text"
                        value={full_name}
                        onChange={(name) => setName(name.target.value)}
                    />
                    <label className="mb-3 block text-base font-medium text-[#07074D]">Enter shortcode: </label>
                    <input className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" type="text"
                        value={shortcode}
                        onChange={(name) => setShortcode(name.target.value)}
                    />

                    <button className="hover:shadow-form w-full mt-5 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
        
    )
}

export default NewDegree