import { useState } from "react";
import styled from "styled-components";
import { FormElement } from "../../commonStyle";

const Container = styled.div`
display:flex;
flex-wrap: wrap;
`
const Chip = styled.div`
border:1px solid rgb(72 86 95);
margin:0.2rem 1rem 0.2rem 0;
padding: 0.5rem 1rem;
border-radius: 1rem;
cursor: pointer;
transition: .2s ease;
background:${({ active }) => active ? 'linear-gradient(135deg,#E5ADB4,60%,#C53546)' : ''};
color:${({ active }) => active ? '#ffffff' : '#bcbfc2'};
font-weight:${({active})=>active?'bold':''};
&:hover{
    border:1px solid #ffffff;
    color:#ffffff;
}
`
export default function Chips({ options }) {
    const [selected, setSelection] = useState('');
    function handleClick(value) {
        setSelection(value);
    }
    return (
        <FormElement>
            <Container>
                {options.map((item,i) => (
                    <Chip key={i}
                        onClick={() => handleClick(item.value)}
                        active={item.value===selected}
                    >
                        {item.label}
                    </Chip>
                ))}
            </Container>
        </FormElement>
    )
}