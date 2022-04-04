
import './App.css';
import styled from 'styled-components';
import {ReactSession} from 'react-client-session';
import {Routes, Route} from "react-router-dom";
import Dashboard from './views/dashboard';
import Publish from './views/publish';
import Support from './views/support';
import Onsite from './views/onSite';
import Header from './components/header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ScrollContainer } from './components/ScrollContainer';
import { Provider } from 'react-redux';
import SeatLayoutPage from './views/seatLayout';
import Error from './components/Error';
import store from './redux/store';
import BookingSummary from './views/bookingSummary';

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

ReactSession.setStoreType("sessionStorage");

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <Container>
            <Header />
            <ScrollContainer>
              <WorkSpace>
                <Routes>
                  <Route path="/publish" element={<Publish />}/>
                  <Route path="/support" element={<Support />}/>
                  <Route path="/onsite" element={<Onsite />} />
                  <Route path={`/selectSeats/:count`} element={<SeatLayoutPage />} />
                  <Route path={'/book'} element={<BookingSummary/>}/>
                  <Route path="/" element={<Dashboard />} />
                  <Route path='/play' element={<Error/>}></Route>
                  <Route
                    path="*"
                    element={<Dashboard to="/" />}
                  />
                  </Routes>
              </WorkSpace>
            </ScrollContainer>
          
        </Container>
      </Provider>
  </ThemeProvider>
  );
}

export default App;
