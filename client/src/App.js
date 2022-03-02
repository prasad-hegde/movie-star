
import './App.css';
import styled from 'styled-components';
import {Routes, Route} from "react-router-dom";
import Dashboard from './views/dashboard';
import Publish from './views/publish';
import Support from './views/support';
import Onsite from './views/onSite';
import Header from './components/header';

const WorkSpace = styled.div`
display:flex;
`

function App() {
  return (
    <div className="App">
      <Header/>
      <WorkSpace>
        <Routes>
          <Route path="/publish" element={<Publish />}/>
          <Route path="/support" element={<Support />}/>
          <Route path="/onsite" element={<Onsite />} />
          <Route path="/" element={<Dashboard />} />
          <Route
            path="*"
            element={<Dashboard to="/" />}
          />
        </Routes>
      </WorkSpace>
    </div>
  );
}

export default App;
