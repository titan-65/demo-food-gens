import React from 'react';

export default function Hero({ mainText }) {
	return (
		<div className="hero-body">
			<div className="container has-text-centered">
				<p className="title is-1" style={mainText}>
					Welcome to FoodGens
				</p>
			</div>
		</div>
	);
}
