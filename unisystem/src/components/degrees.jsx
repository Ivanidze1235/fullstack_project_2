import React, {useState, useEffect} from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ViewDegree from './degreeView';
import LinkDegree from './degreeLink';
function DegreeList(){
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/degree/")
        .then(response => response.json())
        .then(data => {
            setData(data)
        })
    },[])

    const displayDegrees = () =>{
        
        if(data != null){
            let datalist = data.map(el => <li>
                {el.full_name}
                <p>{el.shortcode}</p>
                <Routes>
                    <Route path="/" element={<LinkDegree data={el.shortcode}/>}></Route>
                    <Route path={"/degree/" + el.shortcode} element={<ViewDegree data={el.shortcode}/>}></Route>
                </Routes>
                </li>);
            return datalist
        }
    }

    return (
        <BrowserRouter>
            <ul>
                {displayDegrees()}
            </ul>
        </BrowserRouter>
        
    )
}
export default DegreeList;