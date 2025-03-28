import { Link } from "react-router";
import { useState } from 'react';
import { useEffect } from 'react';

function Degrees(){
    
    const [degreeData, setDegreeData] = useState(null)
      useEffect(()=> {
        fetch("http://localhost:8000/api/degree")
                .then((res) => res.json())
                .then(data => {
                  setDegreeData(data)
                })
                .catch((err) => console.error(err))
        }, [])

    const listDegreeLinks = () => {
        if(degreeData != null){
            console.log(degreeData)
            let list = degreeData.map(el => <li key={el.shortcode}><Link to={`/degree/?degree=${el.shortcode}`}>Go to {el.shortcode}</Link></li>)
            return list;
        }
        
    }
    return(
        <div>
            <p>List of degrees</p>
            <ul>
                {listDegreeLinks()}
                <p><Link to={"/newdegree"}>Create new degree</Link></p>
                <p><Link to={"/"}>Go home</Link></p>
            </ul>
            
        </div>
        
    )        
}

export default Degrees