import { Link } from "react-router";

function Cohorts({data}){
    
    const listCohortLinks = () => {
        if(data != null){
            console.log("this is data")
            console.log(data)
            let list = data.map(el => <li key={el.id}>{el.id} <Link to={`/cohort/?code=${el.id}`}>Go to {el.id}</Link></li>)
            return list;
        }
        
    }
    return(
        <div>
            <p>List of Cohorts</p>
            <ul>
                {listCohortLinks()}
                <Link to={"/"}>Go home</Link>
            </ul>
            
        </div>
        
    )        
}

export default Cohorts