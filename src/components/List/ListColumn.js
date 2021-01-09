import React from 'react'
import Card from '../Cards/Card'

export default function ListColumn({list}) {
	return (
		<>
			{list.map(({objectID, ...item}) => {
				  return (
					<div className="column" key={objectID}>
					  <Card {...item}/>
					</div>
				  )
				})}
		</>
	)
}