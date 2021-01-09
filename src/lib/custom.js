import {useState, useEffect} from 'react'
export const useSemiPersistState = (key, initialState) => {
	const [value, setValue] = useState(
		localStorage.getItem(key) || initialState
	  )
	  
	  useEffect(() => {
		localStorage.setItem(key, value);
	  }, [value, key])
	  
	return [value, setValue]
}

