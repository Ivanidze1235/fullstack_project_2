import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import Home from './components/home';
import { useState } from 'react';
import { useEffect } from 'react';
import Degree from './components/degree';

function App() {
  const [data, setData] = useState(null);
  useEffect(()=> {
    fetch("http://localhost:8000/api/degree")
            .then((res) => res.json())
            .then(data => {
              setData(data)
            })
            .catch((err) => console.error(err))
    }, [])

    const listDegree = () => {
                if(data != null){
                  let list = data.map(el => <Route exact path={`/degree/${el.shortcode}`} element={<Degree deg={el}/>}></Route>)
                  return list;
                }
              }
    return (
      <div className="App">
        <Routes>
            <Route exact path='/' element={<Home data={data}/>}></Route>
            {listDegree()}
        </Routes>
      </div>
    );
}

export default App;
