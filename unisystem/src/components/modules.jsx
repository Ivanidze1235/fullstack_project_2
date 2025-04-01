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
            let list = moduleData.map(el => <li className="py-4 text-slate-800 font-bold uppercase text-right" key={el.code}> {el.full_name} <Link className="text-blue-500" to={`/module/?module=${el.code}`}>Go to {el.code}</Link></li>)
            return list;
        }
        
    }
    return(
        <div className="flex bg-gray-100">
            <div className="flex-col w-64 bg-gray-800">
                <p className="flex items-center justify-center h-16 bg-gray-900"><Link className="text-blue-500" to={"/newmodule"}>Create new module</Link></p>
                <p className="flex items-center justify-center h-16 bg-gray-900"><Link className="text-blue-500" to={"/"}>Go home</Link></p>
            </div>
            
            <ul className="divide-y divide-gray-300 mt-5 ml-auto mr-5 px-4 border w-70 ">
                <p className="py-4 text-slate-700 font-bold uppercase text-left">List of modules</p>
                {listModuleLinks()}
            </ul>
        </div>
        
    )        
}

export default Modules