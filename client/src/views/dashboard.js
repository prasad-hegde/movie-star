import { Route, Routes } from "react-router-dom";
import Carousel from "../components/Carousel";
import MoviePreview from "../components/movieDetails";
import MovieList from "../components/movieList";
import { bannerList, movieList } from "../mock";



export default function Dashboard() {
    return (

        <Routes>
            <Route
                path="movies/:movieId"
                element={<MoviePreview />}
            />
            <Route
                path="/"
                element={ <>
                    <Carousel options={bannerList} ></Carousel>
                    <MovieList list={movieList}></MovieList>
                </>}
            />
        </Routes>
        
    )
}