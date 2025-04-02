import { Link } from "react-router";
import { useState } from 'react';
import { useEffect } from 'react';

function Degrees(){
    
    const [degreeData, setDegreeData] = useState(null)
      useEffect(()=> {
        fetch("http://localhost:8000/api/degree")
                .then((res) => res.json())
                .then(data => {
                  setDegreeData(data)
                })
                .catch((err) => console.error(err))
        }, [])

    const listDegreeLinks = () => {
        if(degreeData != null){
            console.log(degreeData)
            let list = degreeData.map(el => <li className="py-4 text-slate-800 font-bold uppercase text-right" key={el.shortcode}><Link className="text-blue-500" to={`/degree/?degree=${el.shortcode}`}>Go to {el.shortcode}</Link></li>)
            return list;
        }
        
    }
    return(
        <div className="flex bg-gray-100 min-h-screen">
            <div className="flex-col w-64 bg-gray-800">

                <Link className="text-blue-500" to={"/newdegree"}><button className="flex items-center justify-center h-16 bg-gray-900 w-full">Create new degree</button></Link>
                <Link className="text-blue-500" to={"/"}><button className="flex items-center justify-center h-16 bg-gray-900 w-full">Go home</button></Link>
            
            </div>
            <ul className="divide-y divide-gray-300 mt-5 ml-auto mr-5 px-4 border min-w-96">
                <p className="py-4 text-slate-700 font-bold uppercase text-left">List of degrees</p>
                {listDegreeLinks()}
            </ul>
           
        </div>
        
    )        
}

export default Degrees