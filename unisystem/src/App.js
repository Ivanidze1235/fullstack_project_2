import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Degrees from './components/degrees';
import Degree from './components/degree';
import Home from './components/home';
import Cohorts from './components/cohorts';
import Cohort from './components/cohort';
import Student from './components/student';
import Modules from './components/modules';
import Module from './components/module';
import ModuleStudents from './components/moduleStudents';
import NewDegree from './components/newdegree';

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
                console.log(cohortData)
              })
              .catch((err) => console.error(err))
      }, [])

    const [moduleData, setModuleData] = useState(null)
    useEffect(()=> {
      fetch("http://localhost:8000/api/module")
              .then((res) => res.json())
              .then(data => {
                setModuleData(data)
              })
              .catch((err) => console.error(err))
      }, [])

  if (degreeData != null && cohortData != null){
    return (
      <div className="App">
        
        <Routes>
          <Route exact path={"/"} element={<Home/>}></Route>
          <Route exact path={"/degrees"} element={<Degrees data={degreeData}/>}></Route>
          <Route exact path={"/cohorts"} element={<Cohorts data={cohortData}/>}></Route>
          <Route exact path={"/modules"} element={<Modules data={moduleData}/>}></Route>
          <Route path={"/degree"} element={<Degree/>}></Route>
          <Route path={"/cohort"} element={<Cohort/>}></Route>
          <Route path={"/student"} element={<Student/>}></Route>
          <Route path={"/module"} element={<Module/>}></Route>
          <Route path={"/module/students"} element={<ModuleStudents/>}></Route>
          <Route exact path={"/newdegree"} element={<NewDegree/>}></Route>
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
