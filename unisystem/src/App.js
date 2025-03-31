import './App.css';
import { Route, Routes } from 'react-router-dom';

import Degrees from './components/degrees';
import Degree from './components/degree';
import Home from './components/home';
import Cohorts from './components/cohorts';
import Cohort from './components/cohort';
import Student from './components/student';
import Modules from './components/modules';
import Module from './components/module';
import ModuleStudents from './components/moduleStudents';
import CohortModules from './components/cohortModules';
import NewDegree from './components/newdegree';
import NewCohort from './components/newcohort';
import NewModule from './components/newmodule';
import NewStudent from './components/newstudent';

function App() {

    return (
      <div className="App">
        <Routes>
          <Route exact path={"/"} element={<Home/>}></Route>
          <Route exact path={"/degrees"} element={<Degrees/>}></Route>
          <Route exact path={"/cohorts"} element={<Cohorts/>}></Route>
          <Route exact path={"/modules"} element={<Modules/>}></Route>
          <Route path={"/degree"} element={<Degree/>}></Route>
          <Route path={"/cohort"} element={<Cohort/>}></Route>
          <Route path={"/student"} element={<Student/>}></Route>
          <Route path={"/module"} element={<Module/>}></Route>
          <Route path={"/module/students"} element={<ModuleStudents/>}></Route>
          <Route path={"/cohort/modules"} element={<CohortModules/>}></Route>
          <Route exact path={"/newdegree"} element={<NewDegree/>}></Route>
          <Route exact path={"/newcohort"} element={<NewCohort/>}></Route>
          <Route exact path={"/newmodule"} element={<NewModule/>}></Route>
          <Route exact path={"/newstudent"} element={<NewStudent/>}></Route>
        </Routes>
      </div>
    );
}


export default App;
