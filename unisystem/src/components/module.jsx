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
            <Link to={"/modules"}>Go to modules</Link>
        </div>
        
    );  
    }
    
}

export default Module;