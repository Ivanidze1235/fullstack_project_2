import { Link } from "react-router-dom"
function Home(){
    return(
        <div>
            <ul>
                <li><Link to={"/degrees"}>Go to degrees</Link></li>
                <li><Link to={"/cohorts"}>Go to cohorts</Link></li>
                <li><Link to={"/modules"}>Go to modules</Link></li>
            </ul>
        </div>
    )
}

export default Home