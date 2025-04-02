import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function Module(){
    
    const [module, setModule] = useState(null)

    let location = useLocation();
    location = new URLSearchParams(location.search);
    let mod = location.get("module")
    useEffect(()=> {
      fetch("http://127.0.0.1:8000/api/module/" + mod)
              .then((res) => res.json())
              .then(data => {
                setModule(data)
              })
              .catch((err) => console.error(err))
      }, [mod])

    if (module != null) {
        console.log(module)
        return(
        <div className="grid grid-cols-1 place-items-stretch bg-gray-100 min-h-screen">
            <p className="flex items-center justify-center bg-gray-900 text-blue-50">{module.code}</p>
            <p className="flex items-center justify-center bg-gray-900 text-blue-50">{module.full_name}</p>
            <Link className="flex text-blue-500 bg-gray-700 hover:bg-gray-800 items-center justify-center" to={"/modules"}><button className="w-full">Go to modules</button></Link>
            <Link className="flex text-blue-500 bg-gray-700 hover:bg-gray-800 items-center justify-center" to={"/module/students/?module=" + module.code}><button className="w-full">Go to students in module</button></Link>
        </div>
        
    );  
    }
    
}

export default Module;