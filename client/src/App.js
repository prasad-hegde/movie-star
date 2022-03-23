
import './App.css';
import styled from 'styled-components';
import {Routes, Route} from "react-router-dom";
import Dashboard from './views/dashboard';
import Publish from './views/publish';
import Support from './views/support';
import Onsite from './views/onSite';
import Header from './components/header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ScrollContainer } from './components/ScrollContainer';
import PlayGround from './views/playground';

const Container = styled.div`
display:flex;
flex-direction:column;
height:100%;
color:#ffffff;
`
const WorkSpace = styled.div`
display:flex;
flex-grow: 1;
flex-direction: column;

`


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
  <ThemeProvider theme={darkTheme}>
    <Container>
        <Header />
        <ScrollContainer>
          <WorkSpace>
            <Routes>
              <Route path="/publish" element={<Publish />}/>
              <Route path="/support" element={<Support />}/>
              <Route path="/onsite" element={<Onsite />} />
              <Route path="/play" element={<PlayGround />} />
              <Route path="/" element={<Dashboard />} />
              <Route
                path="*"
                element={<Dashboard to="/" />}
              />
              </Routes>
          </WorkSpace>
        </ScrollContainer>
      
    </Container>
  </ThemeProvider>
  );
}

export default App;
