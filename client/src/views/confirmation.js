import styled from "styled-components"
import SuccessIcon from "../assets/icons/success"



const Container = styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:column;
align-items: center;
`
const IconWrap = styled.div`
width:10rem;
height:10rem;
`
const Message = styled.div`
padding: 0rem 1.5rem 1.5rem 1.5rem;
font-weight: 800;
font-size: 2rem;
`

export default function Confirmation({ message = '',children }) {
    
    return (
         <Container>
            <IconWrap>
                <SuccessIcon></SuccessIcon>
            </IconWrap>
            <Message>{message}</Message>
            {children}
        </Container>
       
    )
}