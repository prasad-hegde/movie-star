import Carousel from "../components/Carousel";
import MovieList from "../components/movieList";
import { bannerList, movieList } from "../mock";



export default function Dashboard() {
    return (
        <>
            <Carousel options={bannerList} ></Carousel>
            <MovieList list={movieList}></MovieList>
        </>
        
    )
}