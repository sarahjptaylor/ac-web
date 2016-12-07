import {PropTypes} from 'react'
import {compose, renameProp, renameProps, setDisplayName, setPropTypes, withProps, mapProps, defaultProps} from 'recompose'
import Content from 'components/mountainInformationNetwork/Content'
import {asTermAndDefinition} from 'components/description/utils'

export default compose(
    setDisplayName('CriticalFactors'),
    setPropTypes({
        persistentAvalancheProblem: PropTypes.oneOf([true, false, null]),
        slabAvalanches: PropTypes.oneOf([true, false, null]),
        instability: PropTypes.oneOf([true, false, null]),
        recentSnowfall: PropTypes.oneOf([true, false, null]),
        recentRainfall: PropTypes.oneOf([true, false, null]),
        recentWindloading: PropTypes.oneOf([true, false, null]),
        significantWarming: PropTypes.oneOf([true, false, null]),
        comments: PropTypes.string,
    }),
    defaultProps({
        persistentAvalancheProblem: 'N/A',
        slabAvalanches: 'N/A',
        instability: 'N/A',
        recentSnowfall: 'N/A',
        recentRainfall: 'N/A',
        recentWindloading: 'N/A',
        significantWarming: 'N/A',
        comments: 'N/A',
    }),
    renameProps({
        persistentAvalancheProblem: 'Persistent avalanche problem',
        slabAvalanches: 'Slab avalanches in the last 48 hours',
        instability: 'Signs of instability',
        recentSnowfall: 'Recent snowfall > 30cm',
        recentRainfall: 'Recent rainfall',
        recentWindloading: 'Recent windloading',
        significantWarming: 'Significant warming',
    }),
    mapProps(({comments, ...values}) => ({
        comment: comments,
        descriptions: asTermAndDefinition(values),
    })),
)(Content)
