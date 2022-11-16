import React, { useContext,useState, useEffect } from "react"

const AppContext = React.createContext()
export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`
const AppProvider = ({children}) => {
    const [isLoading,setisLoading] = useState(true)
    const [movie,setMovie] = useState([])
    const [isError,setIsError] = useState({show:"false",msg:""})
    const [query,setQuery] = useState("titanic")
    const getMovies = async (url) => {
        setisLoading(true)
        try {
            const res = await fetch(url)
            const data = await res.json()
            console.log(data)
            if(data.Response === "True"){
                setisLoading(false)
                setMovie(data.Search)
                setIsError({
                    show:"false",
                    msg:""
                 })
            }
            else{
                setIsError({
                   show:"true",
                   msg:data.Error
                })
            }
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        let timeOut = setTimeout(() => {
        getMovies(`${API_URL}&s=${query}`)
        }, 1000);
        return ()=>clearTimeout(timeOut)
    },[query])

    return <AppContext.Provider value={{isLoading,movie,isError,query,setQuery}}>
        {children}
    </AppContext.Provider>
}

// global custom hooks
const useGlobalContext =() =>{
    return useContext(AppContext)
}

export {AppContext,AppProvider,useGlobalContext}