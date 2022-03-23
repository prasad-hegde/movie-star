// import { useState } from 'react';
import styled from 'styled-components';
import Logo from '../assets/icons/logo';
// import { top100Films } from '../mock';
// import AutoComplete from './AutoComplete';

const LogContainer = styled.div`
display:flex;
margin: 0 2rem;
width: 8rem;
`

const Container = styled.div`
display:flex;
height:4.5rem;
margin: 1em 1rem;
`
// const SearchWrap = styled.div`
// flex:1
// `
export default function Header() {
    // const [search, setSearchValue] = useState({});
    return (
        <Container>
            <LogContainer>
                <Logo />
            </LogContainer>
            {/* <SearchWrap>
                <AutoComplete label="Theatres" value={search} options={top100Films} onChange={(val) => setSearchValue(val)} />
            </SearchWrap> */}
        </Container>
    );
}