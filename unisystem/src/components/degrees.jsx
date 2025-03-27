import { Link } from "react-router";

function Degrees({data}){
    
    const listDegreeLinks = () => {
        if(data != null){
            console.log(data)
            let list = data.map(el => <li key={el.shortcode}><Link to={`/degree/?degree=${el.shortcode}`}>Go to {el.shortcode}</Link></li>)
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