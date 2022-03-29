import { useSelector } from "react-redux";
import styled from "styled-components"
import { colors } from "../pallette";

const Container = styled.div`
display:flex;
flex-direction:column;
padding: 1rem 2.5rem;
margin: 1rem 0;
align-self: center;
min-width: 50vw;
`

const Title = styled.div`
font-size:1.5rem;
font-weight:700;
margin: 1rem 0;
padding: 1rem;
background:${colors.browny};
`;

const Text = styled.div`

`
const Item = styled.div`
display:flex;
padding:0.5rem 1rem;
margin:0.5rem 0;
flex-wrap: wrap;
justify-content: space-between;
${({bordered})=>bordered&&`border-bottom:1px solid #ffffff3b;border-top:1px solid #ffffff3b;`}
`
export default function BookingSummary() {

    const {seatDetails,showDetails,ticketCount} = useSelector((state) => state);

    return (
        <Container>
            <Title>Booking Summary</Title>
            <Item>
                <Text>Seats</Text>
                <Text>{seatDetails.join(', ')}</Text>
            </Item>
            <Item>
                <Text>Venue</Text>
                <Text>{showDetails.venue}</Text>
            </Item>
            <Item>
                <Text>{'Time & Date'}</Text>
                <Text>{showDetails.date+' '+showDetails.time}</Text>
            </Item>
            {Object.keys(ticketCount?.ticketCount).map(item => (
                <Item>
                    <Text>{item}</Text>
                    <Text>{ticketCount?.ticketCount[item]}</Text>
                </Item>
            ))}
            <Item bordered>
                <Text>{`Total (${ticketCount?.total?.item})`}</Text>
                <Text>{ticketCount?.total?.subTotal}</Text>
            </Item>

        </Container>
    )
}