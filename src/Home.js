import React from 'react'
//import {AppContext} from './context'
import Movies from './Movies'
import Search from './Search'
const Home = () => {
  //const contextval = useContext(AppContext)
  return (
    <React.Fragment>
      <Search/>
      <Movies/>
    </React.Fragment>
  )
}

export default Home

