import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import styled from "styled-components"
import { movieDetails, showTime, theatres } from "../mock"
import { colors } from "../pallette"
import TicketCounter from "./TicketCounter";
import { FormElement } from "../commonStyle";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const moment = require('moment');


const ColumnFlex = styled.div`
display:flex;
flex-direction:column;
`
const Container = styled(ColumnFlex)`
margin:2rem 0rem;
`
const MovieBanner =  styled(ColumnFlex)`
padding: 1rem 3.5rem;
// border-bottom: 1px solid white;
// border-top: 1px solid white;
background:${colors.mattBlack}
`
const Title = styled.div`
font-size:${({small})=>small?'1.5rem':'2rem'};
font-weight: 700;
margin-bottom:0.5rem;

`

const Details = styled.div`
display:flex;
`
const Chip = styled.div`
display:flex;
background: ${({inActive})=>inActive?colors.browny:colors.duskyRed};
padding: 0.2rem 0.5rem;
border-radius: 0.2rem;
font-weight: 700;
width: fit-content;
align-items:center;
margin-right: 1rem;
flex-direction: column;
justify-content: center;
text-transform:uppercase;
transition:.2s ease;
${({inActive})=>inActive&&`&:hover {background:${colors.mattBlack}}`}
`
const Plain = styled.div`
margin: 0.5rem 0;
`
const Section = styled.div`
display: flex;
flex-direction:column;
padding: 1rem 3.5rem;

`
const FilterSection = styled(Section)`
position: sticky;
top: 0;
background:#362933;
`
const BiList = styled(ColumnFlex)`
padding: 1rem 0;
margin: 1rem 0;
border-bottom:1px solid grey;
`
const TimeChip = styled(Chip)`
background:${colors.mattBlack};
border:1px solid ${colors.browny};
&:hover{
    background:${colors.duskyRed}; 
}
`
const TotlaWrap = styled.div`
display: flex;
justify-content: space-between;
background: transparent;
padding: 1rem;
border-top: 1px solid;
margin-top: 0.5rem;
`

function generateWeekDates() {
    const week = Array(7).fill(0);
    week.forEach((_, i) => {
        const newDate = moment().add(i, "days");
        const day = newDate.format('ddd');
        const date = newDate.format('DD');
        const fullDate = newDate.format('mm-dd-yyyy');
        week[i] = {
            day,
            date,
            fullDate
        }
    })
    week[0].day = 'Today';
    week[1].day = 'Tom';
    return week;
}

export default function ShowSelection() {
    const week = generateWeekDates();
    const [activeDateIndex, setDateIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [ticketCount, setTicketCount] = useState({});
    const [total, setTotal] = useState({item:0,subTotal:0});

    const navigate = useNavigate();

    function handleTicketShop(count) {
        let item = 0;
        let subTotal = 0;

        Object.keys(count).forEach(ticket => {
            subTotal += priceTable[ticket] * count[ticket];
            item += count[ticket];
        });
        setTotal({item,subTotal});
        setTicketCount(count)
    }


    const priceTable = {
        adult: 15,
        child: 10,
        senior: 12,
    };

    function handleShowSelect(venue,time) {
        setOpen(true)
    }

    return (
        <Container>
            <MovieBanner>
                    <Title>{movieDetails.name}</Title>
                    <Details>
                        <Chip>{movieDetails.language}</Chip>
                        <Chip>{movieDetails.dimension}</Chip>
                        <Plain>{`${movieDetails.runTime} ☉ ${movieDetails.genre}`}</Plain>
                    </Details>
            </MovieBanner>
            <FilterSection>
                <Details>
                    {week.map((item, i) => (<Chip key={i}
                        style={{cursor:'pointer'}}
                        onClick={()=>setDateIndex(i)}
                        inActive={activeDateIndex != i}>
                        <div>{item.date}</div>
                        <div>{item.day}</div>
                    </Chip>))}
                </Details>
            </FilterSection>
            <Section>
                {theatres.map((venue, i) => (
                    <BiList index={i}>
                    <Title small>{venue}</Title>
                    <Details>
                        {showTime.map((time, i) => (<TimeChip key={i}
                            style={{ cursor: 'pointer' }}
                            onClick={() =>handleShowSelect(venue,time)}
                            inActive>{time}</TimeChip>))}
                        </Details>
                        </BiList>
                ))}
            </Section>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <Section>
                    <Title small style={{padding:'0.5rem'}}>Select Tickets</Title>
                    <TicketCounter priceTable={priceTable} onChange={count => handleTicketShop(count)}></TicketCounter>
                    <TotlaWrap>
                        <Title small>Total</Title>
                        <Title small>{'$'+total.subTotal}</Title>
                    </TotlaWrap>
                    <FormElement justifyContent='flex-end'>
                        <Button label="Select Seats" disabled={total.item<=0} position="end" onClick={()=>navigate(`/selectSeats/${total.item}`)}/>
                    </FormElement>
                </Section>
            </Dialog>
        </Container>
    )
}