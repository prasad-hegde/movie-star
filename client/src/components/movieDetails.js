import {useParams,useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FormElement, MovieCard } from "../commonStyle";
import { movieDetails } from "../mock";
import samplePoster from '../assets/images/samplePoster.png';
import { colors } from "../pallette";
import Button from "./Button";

export const OneCard = ({movieId}) => {
    const CardHolder = styled.div`
    height: 25rem;
    width: 18rem;
    `
    const Container = styled.div`
    display:flex;
    padding: 0 2.5rem;
    background-size: cover;
    background-image:linear-gradient(#eb01a500,#eb01a500,#10242f),url(${samplePoster});
    `
    const DetailsWrap = styled.div`
    display:flex;
    flex-direction: column;
    margin: 1rem;
    padding: 1.5rem 0;
    flex: 1;
    `
    const Title = styled.div`
    font-size:2rem;
    font-weight: 700;
    `
    const Details = styled.div`
    display:flex;
    flex-direction: column;
    padding-bottom:5rem;
    `
    const Chip = styled.div`
    display:flex;
    background: ${colors.duskyRed};
    padding: 0.2rem 0.5rem;
    margin: 0.5rem 0;
    border-radius: 0.2rem;
    font-weight: 700;
    width: fit-content;
    text-transform:uppercase;
    `
    const Plain = styled.div`
    margin: 0.5rem 0;
    `
    const navigate = useNavigate();
    return (
        <Container>
            <CardHolder>
                <MovieCard fullHeight url={samplePoster}></MovieCard>
            </CardHolder>   
            <DetailsWrap>
                <Title>{movieDetails.name}</Title>
                <Details>
                    <Chip>{movieDetails.language}</Chip>
                    <Chip>{movieDetails.dimension}</Chip>
                    <Plain>{`${movieDetails.runTime} ☉ ${movieDetails.genre}`}</Plain>
                </Details>
                <FormElement>
                    <Button label="Book Tickets" position="end" onClick={()=>navigate(`/movies/select-show/${movieId}`)}/>
                </FormElement>
            </DetailsWrap>
        </Container>
    )
}
export default function MoviePreview() {
    let params = useParams();
    const Container = styled.div`
    display:flex;
    flex-direction: column;
    `
    const About = styled.div`
    display:flex;
    flex-direction:column;
    padding:0 3.5rem;
    `
    const Title = styled.div`
    font-size:1.5rem;
    font-weight: 700;
    padding: 1rem 0;
    `
    const Details = styled.div`
    
    `
    return (
        <Container>
            <OneCard movieId={params.movieId}></OneCard>
            <About>
                <Title>About the movie</Title>
                <Details>{movieDetails.synopsis}</Details>
            </About>
        </Container>
    )
}