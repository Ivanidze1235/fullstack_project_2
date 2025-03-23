import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function Home(data){
    const listLink = () => {
        if(data.data != null){
          let list = data.data.map(el => <li><Link to={`/degree/${el.shortcode}`}>Go to {el.shortcode} </Link></li>)
          return list;
        }
      }
    return(
        <div>
            <p>We are at home</p>
            <ul>
                {listLink()}
            </ul>
        </div>
        
    );
}

export default Home;