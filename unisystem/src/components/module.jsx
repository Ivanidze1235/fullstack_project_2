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
        <div>
            <p>{module.code}</p>
            <p>{module.full_name}</p>
            <ul>
              <li><Link className="text-blue-500" to={"/modules"}>Go to modules</Link></li>
              <li><Link className="text-blue-500" to={"/module/students/?module=" + module.code}>Go to students in module</Link></li>
            </ul>
        </div>
        
    );  
    }
    
}

export default Module;