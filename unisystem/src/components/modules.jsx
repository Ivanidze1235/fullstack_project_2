import { Link } from "react-router";
import { useState } from 'react';
import { useEffect } from 'react';

function Modules(){
    
    const [moduleData, setModuleData] = useState(null)
    useEffect(()=> {
      fetch("http://localhost:8000/api/module")
              .then((res) => res.json())
              .then(data => {
                setModuleData(data)
              })
              .catch((err) => console.error(err))
      }, [])

    const listModuleLinks = () => {
        if(moduleData != null){
            console.log(moduleData)
            let list = moduleData.map(el => <li key={el.code}> {el.full_name} <Link to={`/module/?module=${el.code}`}>Go to {el.code}</Link></li>)
            return list;
        }
        
    }
    return(
        <div>
            <p>List of modules</p>
            <ul>
                {listModuleLinks()}
                <Link to={"/"}>Go home</Link>
            </ul>
            
        </div>
        
    )        
}

export default Modules