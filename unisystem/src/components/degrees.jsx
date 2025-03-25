import { Link } from "react-router";

function Degrees({data}){
    
    const listDegreeLinks = () => {
        if(data != null){
            console.log(data)
            let list = data.map(el => <li><Link to={`/degree/?degree=${el.shortcode}`}>Go to {el.shortcode}</Link></li>)
            return list;
        }
        
    }
    return(
        <div>
            <p>List of degrees</p>
            <ul>
                {listDegreeLinks()}
                <Link to={"/"}>Go home</Link>
            </ul>
            
        </div>
        
    )        
}

export default Degrees