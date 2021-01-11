import React from 'react'
import Card from '../Cards/Card'

export default function ListColumn({list, onRemoveItem}) {
	// console.log(onRemoveItem)
	return (
		<>
			{list.map((item) => {
				  return (
					<div className="column is-half" key={item.objectID}>
					  <Card item={item} onRemoveItem={onRemoveItem}/>
					</div>
				  )
				})}
		</>
	)
}