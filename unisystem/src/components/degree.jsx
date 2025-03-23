import { Link } from "react-router-dom";
function Degree(deg){
    return(
        <div>
            <p>{deg.deg.full_name}</p>
            <p>{deg.deg.shortcode}</p>
            <Link to={"/"}>Go back</Link>
        </div>
        
    );
}

export default Degree;