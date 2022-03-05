import styled from "styled-components";


export const FormElement = styled.div`
margin:1rem 0;
display:flex;
justify-content:${({justifyContent})=>justifyContent?justifyContent:''};
`