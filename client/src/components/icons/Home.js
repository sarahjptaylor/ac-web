import React from 'react'
import Icon from './Icon'

function Home({ inverse = false, ...props }) {
	return (
		<Icon {...props} viewBox='7 5 90 80'>
            <g>
            	<path fill={inverse ? 'white' : 'black'} d='M51.774,12.863l-7.93,13.661c1.273,4.447,3.458,10.183,5.657,14.337
            		c7.496,14.151,21.463,32.806,23.624,35.543h15.237L51.774,12.863z'/>
                <path fill={inverse ? 'white' : 'black'} d='M48.566,41.11c-1.157-2.538-3.973-9.397-5.12-13.895l-3.179,5.521c0.933,3.972,3.278,8.715,5.134,12.33
            		c5.359,10.44,15.467,24.318,20.819,31.338h2.196C63.814,69.92,50.948,46.337,48.566,41.11z'/>
                <path fill={inverse ? 'white' : 'black'} d='M59.266,76.405h1.992c-5.75-9.329-15.11-27.304-17.118-31.709c-0.999-2.196-3.255-7.432-4.27-11.268
            		l-3.258,5.658c1.071,3.905,2.993,6.925,4.586,10.028C45.663,57.816,53.7,68.914,59.266,76.405z'/>
                <path fill={inverse ? 'white' : 'black'} d='M36.196,39.81L15.185,76.405h39.252c-5.719-9.684-12.639-23.545-14.385-27.378
            		C39.191,47.138,37.28,43.58,36.196,39.81z'/>
            </g>
		</Icon>
	)
}

export default Home
