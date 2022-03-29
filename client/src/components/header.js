// import { useState } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/icons/logo';
import { popularLocations } from '../mock';
import { ACTIONS } from '../redux/actions';
import SimpleSelect from './Select';
import AutoComplete from './AutoComplete';
import Button from './Button';
import { FormElement } from '../commonStyle';
import { searchMovie } from '../api';

const LogContainer = styled.div`
display:flex;
margin: 0 2rem;
width: 6rem;
cursor:pointer;
align-items:center;
`

const Container = styled.div`
display:flex;
height:4.5rem;
margin: 1em 1rem;
align-items:center;
`
const SearchWrap = styled.div`
flex:1;
// margin:0 2rem;
`
const SelectWrap = styled.div`
margin:0 1rem;
`
export default function Header() {
    let navigate = useNavigate();
    const [location, setLocation] = useState(popularLocations[0].title);
    const [searchOptions, setSearchOptions] = useState([]);
    const [loadingSearch, setSearchLoading] = useState(false);
    const dispatch = useDispatch();
    
    function onLocationChange(val) {
        setLocation(val);
    }

    function onSearchSelect(val) {
        if (val) {
            navigate(`/movies/${val}`);
        }
    }
    function handleSearch(val) {
        if (!val) return;
        setSearchLoading(true);
        try {
            searchMovie(val).then(res => {
                if (res.data) {
                    const movieResult = res.data.map(item => ({ id: item.movie_id, title: item.title }));
                    setSearchOptions(movieResult);
                }
            }).catch(_error => {
                setSearchOptions([]);
            })
        } catch {
            setSearchOptions([]);
        }
        
        setSearchLoading(false);
    }

    useEffect(() => {
        dispatch({ type: ACTIONS.SET_LOCATION, payload:location});
    },[location])

    return (
        <Container>
            <LogContainer onClick={()=>navigate('/')}>
                <Logo />
            </LogContainer>
            <SearchWrap>
                <AutoComplete variant='outlined'
                    freeSolo label="Search" value={''}
                    options={searchOptions} onChange={(val) => onSearchSelect(val)}
                    clearOnBlur
                    loading={loadingSearch}
                    onInputChange={handleSearch}
                />
            </SearchWrap>
            <SelectWrap>
                <SimpleSelect options={popularLocations.map(item => item.title)}
                    value={location} label="Location" onChange={val => onLocationChange(val)}
                ></SimpleSelect>
            </SelectWrap>
            <FormElement>
                <Button label="Login" />
           </FormElement>
            
        </Container>
    );
}