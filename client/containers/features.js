import { useMemo } from 'react'
import { useFetch } from 'utils/react/hooks'
import { Memory } from 'components/fetch/Cache'
import { metadata } from 'api/urls/metadata'
import * as urls from 'api/urls/forecast'

export function useForecastRegions() {
    return useFetch(urls.regions(), CACHE)
}

export function useForecastRegionsMetadata() {
    return useMultiple(FORECAST_REGIONS)
}

export function useForecastRegionMetadata(id) {
    return useSingle(FORECAST_REGIONS, id)
}

export function useAdvisoriesMetadata() {
    return useMultiple(HOT_ZONES)
}

export function useAdvisoryMetadata(id) {
    return useSingle(HOT_ZONES, id)
}

// TODO Remove that component once comsumers are converted to functional components
export function Regions({ children }) {
    const [data, pending] = useForecastRegionsMetadata()

    return children({ data, pending })
}

// Utils
function useSingle(type, id) {
    const [meta, pending] = useMetadata()
    const data = meta?.[type]?.[id]

    return [data, pending]
}
function useMultiple(type) {
    const [meta, pending] = useMetadata()
    const data = useMemo(
        () =>
            Object.values(meta?.[type] || {})
                .filter(item => !item._legacy)
                .sort(sorter),
        [meta, type]
    )

    return [data, pending]
}
function useMetadata() {
    return useFetch(metadata(), CACHE)
}
const CACHE = new Memory()
const FORECAST_REGIONS = 'forecast-regions'
const HOT_ZONES = 'hot-zones'
function sorter(a, b) {
    return a.name.localeCompare(b.name)
}
