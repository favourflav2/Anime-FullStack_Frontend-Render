import React from "react";
import AnimeMain from "../components/anime/AnimeMain";
import Sidebar from "../components/anime/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import { setCurrentPage, topAnime } from "../redux/features/animeSlice";
import AnimeCard from "../components/anime/AnimeCard";
import Tilt from "react-parallax-tilt";



export default function AnimePage() {
  
  const { searchAnimes, numberOfPages, loading,topAnimes } = useSelector(
    (state) => state.anime
  );
  const dispatch = useDispatch();
  const [error,setError] = React.useState(false)
  const [currentPage,setCurrentPage] = React.useState(1)

  React.useEffect(()=>{
    dispatch(topAnime())
  },[dispatch])

  

 React.useEffect(()=>{
    if(searchAnimes?.length <= 0){
      setError(true)
    }
 },[searchAnimes])


  const postPage= 8
  const lastPostIndex = currentPage * postPage;
  const firstsPostIndex = lastPostIndex - postPage;
  const currentP = searchAnimes?.slice(firstsPostIndex, lastPostIndex);
  

  



  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    
    <div className="w-screen h-screen  sm:grid-cols-[200px_1fr] sm:grid flex bg-[#2a2a35]" >
       <div className="bg-[#2a2a35] border-r-2 border-gray-400 sm:flex hidden flex-col ">

      <h3 className="text-xl font-extrabold my-4 flex items-center justify-center">Top Animes Now</h3>
      {/* <button onClick={()=>dispatch(clearTopAnime())}>cleare</button> */}
        {/* {topAnimes[0] && topAnimes[0]?.map((item,index)=>(
           <Sidebar key={index} {...item} />
        ))} */}
      </div> 
      <div className=" flex flex-col h-full w-full bg-[#161623]">
        <AnimeMain  setError={setError}/>

        {error && <div className="flex items-center justify-center text-2xl text-red-400 mt-7"><span>No results found</span></div> }

        <div className="lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 flex flex-col bg-[#161623] ">
          {currentP?.map((item) => (
            <Tilt key={item.id}>
              <AnimeCard {...item} />
            </Tilt>
          ))}
        </div>
        {searchAnimes?.length > 0 && (
            <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          dispatch={dispatch}
          currentPage={currentPage}
        />
        )}
        
      </div>
    </div>
  );
}

// " flex flex-col h-full w-full bg-[#161623]"
