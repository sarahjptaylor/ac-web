import React from 'react'
import Icon from './Icon'

function Vimeo({inverse = false, ...props}) {
	return (
		<Icon {...props} fill='#1AB7EA' viewBox='0 0 20.847 20.847'>
            <path fill='white' d='M17.811,2.018c2.017,0.053,3.026,1.198,3.036,3.438c0,0.147-0.005,0.3-0.013,0.457c-0.089,1.899-1.502,4.486-4.245,7.76c-2.829,3.43-5.229,5.147-7.2,5.156c-1.226,0-2.244-1.05-3.061-3.151l-0.858-2.88L4.622,9.922C3.997,7.838,3.329,6.798,2.616,6.798   c-0.156,0-0.697,0.304-1.626,0.91L0,6.537l1.536-1.276l1.511-1.263C4.4,2.914,5.429,2.328,6.135,2.241   c0.094-0.01,0.188-0.013,0.284-0.013c1.449,0,2.354,1.041,2.709,3.124C9.326,6.54,9.49,7.506,9.623,8.248   C9.752,8.992,9.86,9.51,9.946,9.805c0.479,1.97,0.995,2.96,1.55,2.968c0.426,0,1.082-0.642,1.968-1.926   c0.866-1.319,1.332-2.296,1.392-2.932c0.019-0.129,0.026-0.25,0.026-0.362c0-0.861-0.474-1.29-1.418-1.29   c-0.479,0-0.99,0.102-1.537,0.299c0.98-3.021,2.864-4.534,5.65-4.544C17.655,2.018,17.732,2.018,17.811,2.018z' />
		</Icon>
	)
}

export default Vimeo
