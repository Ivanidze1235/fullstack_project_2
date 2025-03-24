import logo from './logo.svg';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Degrees from './components/degrees';
import Degree from './components/degree';
import Home from './components/home';
import Cohorts from './components/cohorts';
import Cohort from './components/cohort';
function App() {
  const [degreeData, setDegreeData] = useState(null)
  useEffect(()=> {
    fetch("http://localhost:8000/api/degree")
            .then((res) => res.json())
            .then(data => {
              setDegreeData(data)
            })
            .catch((err) => console.error(err))
    }, [])
    const [cohortData, setCohortData] = useState(null)
    useEffect(()=> {
      fetch("http://localhost:8000/api/cohort")
              .then((res) => res.json())
              .then(data => {
                setCohortData(data)
              })
              .catch((err) => console.error(err))
      }, [])

  const listDegreeRoutes = () => {
    if(degreeData != null){
        let list = degreeData.map(el => <Route exact path={`/degree/${el.shortcode}`} element={<Degree deg={el}/>}></Route>)
        return list;
      }
  }

  const listCohortRoutes = () => {
    if(cohortData != null){
        let list = cohortData.map(el => <Route exact path={`/cohort/${el.id}`} element={<Cohort deg={el}/>}></Route>)
        return list;
      }
  }

  if (degreeData != null && cohortData != null){
    return (
      <div className="App">
        
        <Routes>
          <Route exact path={"/"} element={<Home/>}></Route>
          <Route exact path={"/degree"} element={<Degrees data={degreeData}/>}></Route>
          <Route exact path={"/cohort"} element={<Cohorts data={cohortData}/>}></Route>
          {listDegreeRoutes()}
          {listCohortRoutes()}
        </Routes>
      </div>
    );
  }
  else{
    return(
      <p>Waiting for API response...</p>
    )
  } 
}

export default App;
