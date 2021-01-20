import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import HeroHeader from './components/Hero/HeroHeader';
import ListColumn from './components/List/ListColumn';
import { Search } from './components/Search/Search';
import { useSemiPersistState } from './lib/custom';
import * as Env from './environments';
import Parse from 'parse';

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

const API_ENDPOINT = 'https://parseapi.back4app.com/classes/FoodGen';
const useStyle = {
	backgroundImage: `url('https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1547&q=80')`,
	backgroundSize: 'cover',
};

const mainText = {
	color: 'white',
	textShadow: '4px 4px 12px #29211b',
};

const foodGenReducer = (state, action) => {
	switch (action.type) {
		// case 'SET__FOODGEN':
		//   return action.payload
		// case 'REMOVE_FOODGEN':
		//   return state.filter(foodGen => {
		//     return action.payload.objectID !== foodGen.objectID
		//   })
		case 'FOOD_FETCH_INIT':
			return {
				...state,
				isLoading: true,
				isError: false,
			};
		case 'FOOD_FETCH_SUCCESS':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload,
			};
		case 'FOOD_FETCH_FAILURE':
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		case 'REMOVE_FOODGEN':
			return {
				...state,
				data: state.data.filter(foodGen => {
					return action.payload.objectID !== foodGen.objectID;
				}),
			};
		default:
			throw new Error();
	}
	//   if (action.type === 'SET__FOODGEN') {
	//     return action.payload
	//   } else if (action.type === 'REMOVE_FOODGEN') {
	//     return state.filter(foodGen => {
	//       return action.payload.objectID !== foodGen.objectID
	//     })
	//   } else {
	//     throw new Error
	//   }
};

// const initialList = [
//   {///     objectID: 0,
//     title: 'Gloria',
//     url: 'https://images.unsplash.com/photo-1601314002592-b8734bca6604?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=976&q=80',
//     location: {
//       long: 0,
//       lat: 0,
//     },
//     rating: 5
//
//     },
//     rating: 5
//   },
//   {
//     objectID: 1,
//     title: 'Pan Chicken Spot',
//     url: 'https://images.unsplash.com/photo-1575918766310-d95c6e9df6d7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
//     location: {
//       long: 0,
//       lat: 0,
//     },
//     rating: 4
//   },
// ]

/*
  @name: getAsyncFoodGens
  @desc: Simulate async / API fetching of data
*/
// const getAsyncFoodGens = () => {
//   return new Promise(resolve =>
//     setTimeout(() => resolve({data: {
//       foodGens: initialList
//     }})),
//     5000
//   )
// }

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

	const [searchTerm, setSearchTerm] = useSemiPersistState('search', '');
	/*
    Replace the useState for foodGens for more advanced state management using useReducer
  */
	const [foodGens, dispatchFoodGens] = useReducer(foodGenReducer, {
		data: [],
		isLoading: false,
		isError: false,
	});
	//const [foodGens, setFoodGens] = useState([])
	// const [isLoading, setisLoading] = useState(false)
	// const [isError, setIsError] = useState(false)

	useEffect(() => {
		//setisLoading(true)
		dispatchFoodGens({ type: 'FOOD_FETCH_INIT' });
		async function fetchAPI() {
			try {
				const response = await axios(`${API_ENDPOINT}`, {
					headers: {
						'X-Parse-Application-Id': Env.APPLICATION_ID,
						'X-Parse-REST-API-Key': Env.REST_API_KEY,
						'Content-Type': 'application/json',
					},
				}).then(response => {
					return response.data.results;
				});
				console.log(response);
				dispatchFoodGens({
					type: 'FOOD_FETCH_SUCCESS',
					payload: response,
				});
			} catch {
				dispatchFoodGens({ type: 'FOOD_FETCH_FAILURE' });
			}
		}
		// getAsyncFoodGens().then(result => {
		//     // Implement reducer
		//     //setFoodGens(result.data.foodGens)
		//     dispatchFoodGens({
		//       type: 'FOOD_FETCH_SUCCESS',
		//       payload: result.data.foodGens
		//     })
		//     // setisLoading(false)
		//   }).catch(error => {
		//     dispatchFoodGens({ type: 'FOOD_FETCH_FAILURE' })
		//     //console.log(error)
		//     //setIsError(true)
		//   })
		fetchAPI();
	}, []);

	const handleRemoveFoodGens = item => {
		dispatchFoodGens({
			type: 'REMOVE_FOODGEN',
			payload: item,
		});
		/*
      Removed logic and placed in reducer
    */
		// const newFoodGens = foodGens.filter(foodGen => {
		//   return item.objectID !== foodGen.objectID
		// })
		//setFoodGens(newFoodGens)
		// dispatchFoodGens({
		//   type: 'SET__FOODGEN',
		//   payload: newFoodGens,
		// })
	};

	const handleSearch = event => {
		// console.log(event.target.value)
		setSearchTerm(event.target.value);
	};
	const searchFoodGens = foodGens.data.filter(food => {
		return food.title.toLowerCase().includes(searchTerm.toLowerCase());
	});

	return (
		<>
			<Navbar />
			<HeroHeader mainText={mainText} useStyle={useStyle} />
			<section className="section">
				<div className="container">
					<div className="has-text-centered">
						<h1 className="title is-1">Food Gens</h1>
					</div>
					{foodGens.isError && <p>Something went wrong</p>}
					{/* Search */}
					<Search search={searchTerm} onSearch={handleSearch} />
					{/* Search End */}
				</div>
			</section>
			<section className="section">
				<div className="container">
					<div className="has-text-centered">
						<h1 className="title">Our Services</h1>
					</div>
					<br />
					<div className="columns is-multiline">{foodGens.isLoading ? <progress className="progress is-medium is-info"></progress> : <ListColumn list={searchFoodGens} onRemoveItem={handleRemoveFoodGens} />}</div>
				</div>
			</section>
		</>
	);
}

export default App;
