import React, {useState, useEffect} from 'react'
import Navbar from './components/Navbar/Navbar'
import ListColumn from './components/List/ListColumn'
import {Search} from './components/Search/Search'
import { useSemiPersistState } from './lib/custom'

const useStyle = {
  backgroundImage: `url('https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1547&q=80')`,
  backgroundSize: 'cover'
}

const mainText = {
  color: 'white',
  textShadow: '4px 4px 12px #29211b'
}

const initialList = [
  {
    objectID: 0,
    title: 'Gloria',
    url: 'https://images.unsplash.com/photo-1601314002592-b8734bca6604?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=976&q=80',
    location: {
      long: 0,
      lat: 0,
    },
    rating: 5
  },
  {
    objectID: 1,
    title: 'Pan Chicken Spot',
    url: 'https://images.unsplash.com/photo-1575918766310-d95c6e9df6d7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
    location: {
      long: 0,
      lat: 0,
    },
    rating: 4
  },
]

/*
  @name: getAsyncFoodGens
  @desc: Simulate async / API fetching of data
*/
const getAsyncFoodGens = () => {
  return new Promise(resolve => 
    setTimeout(() => resolve({data: {
      foodGens: initialList 
    }})), 
    5000
  )   
}


function App() {
 
  // Callback function
  //TODO: Remove hooks into custom hooks
  // const [searchTerm, setSearchTerm] = useState(
  //   localStorage.getItem('search') || ''
  // )
  // 
  // useEffect(() => {
  //   localStorage.setItem('search', searchTerm);
  // }, [searchTerm])
  
  const [searchTerm, setSearchTerm] = useSemiPersistState('search', '')
  const [foodGens, setFoodGens] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  
  useEffect(() => {
    setisLoading(true)
    
    getAsyncFoodGens().then(result => {
        setFoodGens(result.data.foodGens)
        setisLoading(false)      
      }).catch(error => {
        console.log(error)
        setIsError(true)
      })
  }, [])
  
  const handleRemoveFoodGens = item => {
    const newFoodGens = foodGens.filter(foodGen => {
      return item.objectID !== foodGen.objectID
    })
    setFoodGens(newFoodGens)
  }
  const handleSearch = event => {
    // console.log(event.target.value)
    setSearchTerm(event.target.value)
  }
  const searchFoodGens = foodGens.filter(food => {
    return food.title.toLowerCase().includes(searchTerm.toLowerCase())
  })
  
  return ( 
      <>
        <section className = "hero is-fullheight"  style={useStyle}>
            <div className="hero-head">
                <div className="container">
                  <Navbar />
                </div>
            </div>
            <div className="hero-body">
              <div className="container has-text-centered">
                <p className="title is-1" style={mainText}>Welcome to FoodGens</p>
              </div>
            </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="has-text-centered">
              <h1 className="title is-1">Food Gens</h1>
            </div>
            {isError && <p>Something went wrong</p>}
            {/* Search */}
              <Search search={searchTerm} onSearch={handleSearch}/>
            {/* Search End */}
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="has-text-centered">
              <h1 className="title">Our Services</h1>
            </div>
            <br/>
            <div className="columns">
              {isLoading ? <progress className="progress is-medium is-info"></progress> :  <ListColumn list={searchFoodGens} onRemoveItem={handleRemoveFoodGens}/>}
              </div>
          </div>
        </section>
    </>
    )

}

export default App