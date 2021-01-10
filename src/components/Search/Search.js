import React from 'react'

export const Search = ({search, onSearch}) => {
	/*
	React State 
  */
	const onChangeHandler = (event) => {
	  // console.log(event.target.value)
	  onSearch(event)
	}
	return (
		<InputWithLabel id="search" label="Search" value={search} onInputChange={onChangeHandler} onSearch={onSearch}/>
	)
  }
  
const InputWithLabel = ({id, label, value, type="text", onInputChange, 										onSearch }) => (
	<>
		<div className="field">
		  <label className="label has-text-centered" htmlFor={id}>{label}</label>
			<div className="control">
			  <input className="input" type={type} value={value} onChange={onInputChange} autoFocus placeholder="e.g. Gloira's By The Sea"/>
			</div>
			<div className="has-text-centered">
			  <p className="is-size-7">
				Searching for <strong>{onSearch}</strong>
			  </p>
			</div>
			<hr/>
	  	</div>
	</>	
)
