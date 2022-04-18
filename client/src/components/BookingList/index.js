import styled from "styled-components";
import { fetchBooking } from "../../api";
import useFetch from "../../hooks/useFetch";
import { colors } from "../../pallette";
import Spinner from "../Spinner";

const moment = require('moment');

const ColumnFlex=styled.div`
display:flex;
flex-direction:column;
`
const Main = styled(ColumnFlex)`
margin-top: 2rem;
`
const Container = styled.div`
display:flex;
flex-wrap: wrap;
`

const ListItem = styled(ColumnFlex)`
margin: 1rem 0.5rem;
position:relative;
overflow:hidden;
border-radius: 0.5rem;
width: 10rem;
height: 10rem;
cursor:pointer;
border: 1px solid transparent;
transition:0.2s ease;
&:hover{
    border: 1px solid ${colors.browny};
    transform:scale(1.1);
}
`
const Backgrond = styled.div`
position:absolute;
top:0;
bottom:0;
left:0;
right:0;
filter: blur(10px);
background-size: cover;
z-index:-2;
background-image:linear-gradient(#000000a8,#1125303d,#112530),url(${({ img }) => img && img});
`

const Title = styled.div`
padding: 0.5rem 1rem;
background: #4c2c3685;

`
const Heading = styled.div`
margin: 0rem 0.7rem;
font-size: 1.5rem;
`
const SubText = styled.div`
font-size:.7rem;
margin:.5rem 0;
padding: 0 1rem;
`
function getMinimalList(data) {
    const upcoming = [];
    const past = [];
    data.forEach(item => {
        const { movie, booking } = item;
        const ticket = {
            title: movie.title,
            poster: movie.image,
            location: booking.location,
            venue: booking.venue,
            showTime: moment(booking.showTime).format('MMMM Do YYYY, h:mm A')
        };
        if (moment(booking.showTime) < moment()) {
            past.push(ticket);
        } else {
            upcoming.push(ticket);
        }
    })
    return { upcoming, past };
}
export default function BookingList({ email }) {

    const { data: ticketData, loading, error } = useFetch(fetchBooking(email));
    
    if (loading) {
        return(<Spinner loading={loading} color={'white'} />)
    }
    const  { upcoming, past } = getMinimalList(ticketData);

    return (
        <Main>
            <Heading>Upcoming Bookings</Heading>
            <Container>
                {upcoming.map(ticket => (<ListItem >
                <Backgrond img={ticket.poster}></Backgrond>
                <Title>{ticket.title}</Title>
                <SubText>{ticket.location+', '+ticket.venue}</SubText>
                <SubText>{ticket.showTime}</SubText>
                </ListItem>))}
            </Container>
            <Heading>Past Bookings</Heading>
            <Container>
                {past.map(ticket => (<ListItem >
                <Backgrond img={ticket.poster}></Backgrond>
                <Title>{ticket.title}</Title>
                <SubText>{ticket.location+', '+ticket.venue}</SubText>
                <SubText>{ticket.showTime}</SubText>
                </ListItem>))}
            </Container>
        </Main>
    )

}