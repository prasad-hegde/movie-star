import styled from 'styled-components';
import Logo from '../assets/icons/logo';

const LogContainer = styled.div`
display:flex;
margin: 0 2rem;`

const Container = styled.div`
display:flex;
height:4.5rem;
margin: 2em 1rem;
`

export default function Header() {
    return (
        <Container>
            <LogContainer>
                <Logo />
            </LogContainer>
        </Container>
    );
}