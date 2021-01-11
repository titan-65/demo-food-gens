import React from 'react'

const Card = ({item, onRemoveItem}) => {
	// console.log(onRemoveItem)
	// console.log(item.image)
	const handleRemoveItem = () => {
		onRemoveItem(item);
	}
	return (
		<div className="card">
		  <div className="card-image">
			<figure className="image is-4by3">
			  <img src={item.image.url} alt={item.title}/>
			</figure>
		  </div>
		  <div className="card-content">
			<div className="media">
			  <div className="media-left">
				<figure className="image is-48x48">
				  <img src={item.image.url} alt={item.title}/>
				</figure>
			  </div>
			  <div className="media-content">
				<p className="title is-4">{item.title}</p>
				<p className="subtitle is-6">@{item.title}</p>
			  </div>
			</div>
			<div className="content">
			  {item.url}
			  <br/>
			  <button className="button is-danger" type="button" onClick={handleRemoveItem}>Dismiss</button>
			</div>
		  </div>
		</div>
	)
}
export default Card