import AutoComplete from "../components/AutoComplete";
import styled from "styled-components";
import { dimension, languages, top100Films } from "../mock";
import TextArea from "../components/TextArea";
import Chips from "../components/Chips";
import { FormElement } from "../commonStyle";
import Button from "../components/Button";

const RowFlex = styled.div`
display: flex;
flex-direction: column;
`
const Container = styled(RowFlex)`
margin: 0px 3.5rem;
width: 40%;
`
const FormWrap = styled(RowFlex)`
margin-bottom: 10rem;
`
const Title = styled.div`
font-size: 24px;
font-weight: 700;
margin: 2rem 0;
`
export default function Publish() {

    return (
        <Container>
            <Title>Publish Movie</Title>
            <FormWrap>
                <TextArea label="Movie Name" required />
                <TextArea label="Synopsis" multiline required/>
                <Chips options={languages} />
                <Chips options={dimension} />
                <TextArea label="Run Time" format="hhmm" required/>
                <AutoComplete label="Movies" options={top100Films} multiple={true} />
                <TextArea label="Genre" multiline />
                <AutoComplete label="Locations" options={top100Films} multiple={true} />
                <AutoComplete label="Theatres" options={top100Films} multiple={true} />
                <FormElement justifyContent="flex-end">
                    <Button label="Publish" position="end" onClick={()=>''}/>
                </FormElement>
            </FormWrap>
        </Container>
    )
}