import { Link } from "react-router-dom"
function Home(){
    return(
        <div>
            <ul>
                <li><Link className="text-blue-500" to={"/degrees"}>Go to degrees</Link></li>
                <li><Link className="text-blue-500" to={"/cohorts"}>Go to cohorts</Link></li>
                <li><Link className="text-blue-500" to={"/modules"}>Go to modules</Link></li>
            </ul>
        </div>
    )
}

export default Home