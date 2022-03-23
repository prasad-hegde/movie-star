import styled from "styled-components";


export const FormElement = styled.div`
margin:1rem 0;
display:flex;
justify-content:${({justifyContent})=>justifyContent?justifyContent:''};
`

export const MovieCard = styled.div`
height: 18rem;
border:1px solid white;
flex-shrink:0;
margin:1rem;
border-radius: 0.5rem;
box-shadow: 6px 8px 16px -5px black;
`