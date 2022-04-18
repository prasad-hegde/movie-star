import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import styled from "styled-components"
import { book } from "../api";
import { FormElement } from "../commonStyle";
import Button from "../components/Button";
import { colors } from "../pallette";
import { ReactSession } from 'react-client-session';
import { useState } from "react";
import TextArea from "../components/TextArea";
import Confirmation from "./confirmation";
import Spinner from "../components/Spinner";
import Ticket from "../components/Ticket";
import Payment from "../components/Payment"


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
const moment = require('moment');
export default function BookingSummary() {
    const state = useSelector((state) => state);
    const { seatDetails, showDetails, ticketCount, location } = state;
    const [guestEmail, setGuestEmail] = useState('');
    const userDetails = ReactSession.get('user');
    const [checkoutState, setCheckoutState] = useState(!userDetails?.email);
    const [bookingError, setBookingError] = useState(false);
    const [showConfirmation, setShowConfrimation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showTicket, setShowTicket] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    const navigate = useNavigate();
 


    window.addEventListener("storage",(_e) => {
        setCheckoutState(!userDetails?.email);
     });
    
    function confirmBooking() {
        const { adult, child, senior } = ticketCount?.ticketCount;
        const dateTime = moment(showDetails?.date + ' ' + showDetails?.time, 'MM/DD/YYYY hh:mm A');
        const payload = {
            movieId:showDetails?.movie_id,
            seatTotal:ticketCount?.total?.item,
            totalPrice:ticketCount?.total?.subTotal,
            seatNo: seatDetails,
            seatType:[adult,child,senior],
            showTime: dateTime.format('MM-DD-YYYY hh:mm:ss'),
            userId: '',
            email:userDetails?.email || guestEmail,
            venue: showDetails?.venue,
            location

        }
        setLoading(true);
        book(payload).then(res => {
            setBookingError(false);
            setShowConfrimation(true);
            setShowPayment(false);
        }).catch(e =>
            {setShowConfrimation(true);
            setBookingError(true)});
        setLoading(false);
    }

    const Summary=() => (
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
                <Text>{ticketCount?.total?.subTotal+'$'}</Text>
            </Item>
            {!userDetails?.email && <TextArea label="Email" hasError={(eb) => handleFormError(eb, 0)} value={guestEmail} required format={'email'} onChange={(val) => setGuestEmail(val)} />}
            
            <FormElement justifyContent='end'>
                <Button fullWidth={true} disabled={checkoutState} label={'Checkout'} position="center" onClick={()=>setShowPayment(true)}/>
            </FormElement>

        </Container>
    )

    function handleFormError(error) {
        setCheckoutState(error);
    }

    function afterConfirm() {
        if (bookingError) {
            setBookingError(false);
            setShowConfrimation(false);
        } else {
            setBookingError(false);
            setShowConfrimation(false);
            setShowTicket(true);
        }
    }
    function onPayment() {
        confirmBooking();
    }
    const confrimMessage = bookingError ? 'Something went wrong :(' : 'Booking Confirmed';

    if (loading) {
        return(<Spinner loading={loading} color={'white'} />)
    }

    if (showTicket) {
        return (
                <Ticket email={userDetails?.email || guestEmail}></Ticket>
        )
    }
    if (showPayment) {
        return (<Payment amount={ticketCount?.total?.subTotal} onPayment={onPayment} />);
    }

    return (
        <>
            {showConfirmation ? <Confirmation message={confrimMessage} error={bookingError}>
            <FormElement justifyContent='end'>
                <Button fullWidth={true} disabled={checkoutState} label={bookingError?'Try Again':'View Ticket'} position="center" onClick={afterConfirm}/>
            </FormElement>
            </Confirmation> :
            <Summary />
            }
        </>
    )
}