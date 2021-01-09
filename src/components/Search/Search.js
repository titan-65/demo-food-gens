import React, {useState} from 'react'

export const Search = ({search, onSearch}) => {
	/*
	React State 
  */
	const onChangeHandler = (event) => {
	  // console.log(event.target.value)
	  onSearch(event)
	}
	return (
		<div className="field">
		  <label className="label has-text-centered">Search for Gens</label>
		<div className="control">
		  <input className="input" type="text" value={search} onChange={onChangeHandler} placeholder="e.g. Gloira's By The Sea"/>
		</div>
		<div className="has-text-centered">
		  <p className="is-size-7">
			Searching for <strong>{onSearch}</strong>
		  </p>
		</div>
		<hr/>
	  </div>
	)
  }
  
