import React from 'react'
import { useDispatch, useSelector} from 'react-redux';
import {BsSearch} from 'react-icons/bs'
import { animeSearch, clearCurrentPage, clearSearchAnime } from '../../redux/features/animeSlice';
export default function AnimeMain({setError}) {

  const {loading,currentPage} = useSelector(state => state.anime)
  const [searchValue, setSearchState] = React.useState({
    title:""
  })
  
  const dispatch = useDispatch()


  function handleSubmit(e){
    e.preventDefault()

    if(searchValue){
      dispatch(animeSearch({searchValue,currentPage}))
      dispatch(clearCurrentPage())
    }
    dispatch(clearCurrentPage())
    setError(false)
  }

  
 

  
  function handleChange(e){
    setSearchState(item =>{
      return {
        ...item,
        [e.target.name] : e.target.value
      }
    })
  }

  //console.log(currentPage)


  return (
    <div className='w-auto h-auto flex flex-col mt-7'>


      <div className='flex justify-center flex-col items-center'>
        <div>
        <h1 className='text-4xl'><span className=' text-gray-400'>The</span><span className=' font-extrabold text-red-500'>Anime</span><span className=' text-gray-400'>Database</span></h1>
        </div>
        

        <form className='flex items-center justify-center' onSubmit={(e)=>handleSubmit(e)}>
          <input 
            type="text" 
            className='lg:w-[500px] w-auto shadow appearance-none border-2 rounded-2xl px-3 py-3 bg-neutral-500 text-white leading-tight focus:outline-none focus:shadow-outline 
            flex sm:mb-5 mb-2 mt-5'
            placeholder='Search for anime'
            value={searchValue.title}
            name="title"
            onChange={(e)=>handleChange(e)}
            />

            
            
            <button onClick={(e)=>handleSubmit(e)} disabled={loading} className='ml-3 w-[40px] h-[40px] mt-5 sm:mb-5 mb-2 flex items-center justify-center rounded-lg'>
            <BsSearch className=' text-[30px] hover:text-green-500 text-gray-200'/>
            </button>
            
        </form>
        <div>
        <button type='button' onClick={()=>dispatch(clearSearchAnime())} className=' bg-red-300 w-[100px] rounded-2xl'>Clear Search</button>
        </div>
      </div>

      

    {/* <button onClick={()=>dispatch(clearSearchAnime())} className=' bg-pink-300 w-[100px]'>Clear</button> */}
    
    </div>
  )
}

