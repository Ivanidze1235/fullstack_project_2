import React, {useState, useEffect} from 'react';

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
            let datalist = data.map(el => <li>{el.full_name}</li>);
            return datalist
        }
    }

    return (
        <ul>
            {displayDegrees()}
        </ul>
    )
}
export default DegreeList;