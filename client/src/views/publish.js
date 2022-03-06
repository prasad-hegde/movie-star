import AutoComplete from "../components/AutoComplete";
import styled from "styled-components";
import { dimensions, languages, top100Films } from "../mock";
import TextArea from "../components/TextArea";
import Chips from "../components/Chips";
import { FormElement } from "../commonStyle";
import Button from "../components/Button";
import { useState } from "react";

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

    const [name, setName] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [language, setLang] = useState('');
    const [dimension, setDimension] = useState('');
    const [runTime, setRuntime] = useState('');
    const [genre, setGenre] = useState('');
    const [locations, setLocations] = useState([]);
    const [theatres, setTheatres] = useState([]);
    const [publishFlag, setPublishFlag] = useState(false);

    const [hasError,setError] = useState(Array(8).fill(false));

    // const hasError = useSelector((state) => state.publishError);

    function onPublish() {

        const payload = {
            name,
            synopsis,
            language,
            dimension,
            runTime,
            genre,
            locations,
            theatres
        }
        setPublishFlag(true);
        if (!hasError.includes(true)) {
            console.log(payload);
        }
    }

    function handleFormError(err, index) {
        const temp = [...hasError];
        temp[index] = err;
        setError(temp);
        setPublishFlag(false);
    }

    return (
        <Container>
            <Title>Publish Movie</Title>
            <FormWrap>
                <TextArea label="Movie Name" submitFlag={publishFlag} hasError={(eb)=>handleFormError(eb,0)} value={name} required onChange={(val)=>setName(val)}/>
                <TextArea label="Synopsis" submitFlag={publishFlag} hasError={(eb)=>handleFormError(eb,1)} value={synopsis}  multiline required onChange={(val)=>setSynopsis(val)}/>
                <Chips options={languages} submitFlag={publishFlag} required hasError={(eb)=>handleFormError(eb,2)} onChange={(val)=>setLang(val)}/>
                <Chips options={dimensions} submitFlag={publishFlag} required hasError={(eb)=>handleFormError(eb,3)} onChange={(val)=>setDimension(val)} />
                <TextArea label="Run Time"  submitFlag={publishFlag} hasError={(eb)=>handleFormError(eb,4)} value={runTime} format="hhmm" required onChange={(val)=>setRuntime(val)}/>
                <TextArea label="Genre" submitFlag={publishFlag} hasError={(eb)=>handleFormError(eb,5)} value={genre} multiline  onChange={(val)=>setGenre(val)}/>
                <AutoComplete required submitFlag={publishFlag} hasError={(eb)=>handleFormError(eb,6)}  label="Locations" value={locations} options={top100Films} multiple={true} onChange={(val)=>setLocations(val)} />
                <AutoComplete required submitFlag={publishFlag} hasError={(eb)=>handleFormError(eb,7)} label="Theatres" value={theatres} options={top100Films} multiple={true} onChange={(val)=>setTheatres(val)} />
                <FormElement justifyContent="flex-end">
                    <Button label="Publish" position="end" onClick={onPublish}/>
                </FormElement>
            </FormWrap>
        </Container>
    )
}