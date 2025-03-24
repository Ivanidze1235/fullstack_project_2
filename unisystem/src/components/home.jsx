import { Link } from "react-router-dom"
function Home(){
    return(
        <div>
            <ul>
                <li><Link to={"/degree"}>Go to degrees</Link></li>
                <li><Link to={"/cohort"}>Go to cohorts</Link></li>
            </ul>
        </div>
    )
}

export default Home