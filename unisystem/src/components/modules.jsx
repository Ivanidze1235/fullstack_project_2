import { Link } from "react-router";

function Modules({data}){
    
    const listModuleLinks = () => {
        if(data != null){
            console.log(data)
            let list = data.map(el => <li><Link to={`/module/?module=${el.code}`}>Go to {el.code}</Link></li>)
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