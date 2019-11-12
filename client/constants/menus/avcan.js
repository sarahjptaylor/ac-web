let id = 0

const Gear = {
    id: String(id++),
    label: 'Essential Gear',
    to: '/gear',
}
const TripPlanner = {
    id: String(id++),
    label: 'Trip Planner',
    to: '/planning/trip-planner',
}
const Dangerator = {
    id: String(id++),
    label: 'Dangerator',
    to: '/dangerator',
}
const ForecastRegionsListView = {
    id: String(id++),
    label: 'Forecast Regions List View',
    to: '/forecasts',
}
const WeatherStationsListView = {
    id: String(id++),
    label: 'Weather Stations List View',
    to: '/weather/stations',
}
const MountainWeatherForecast = {
    id: String(id++),
    label: 'Mountain Weather Forecast',
    to: '/weather',
}
const ForecasterBlog = {
    id: String(id++),
    label: 'Forecasters’ Blogs',
    to: '/blogs?category=forecaster+blog',
}
const AvCanTrainingCourses = {
    id: String(id++),
    label: 'AvCan Training Courses',
    header: true,
    to: '/training',
    children: [
        {
            id: String(id++),
            label: 'Find a course',
            to: '/training/courses',
        },
        {
            id: String(id++),
            label: 'Find a provider',
            to: '/training/providers',
        },
        {
            id: String(id++),
            label: 'Avalanche Skills Training 1',
            to: '/training#ast1',
        },
        {
            id: String(id++),
            label: 'Avalanche Skills Training 2',
            to: '/training#ast2',
        },
        {
            id: String(id++),
            label: 'Managing Avalanche Terrain',
            to: '/training#mat',
        },
        {
            id: String(id++),
            label: 'Companion Rescue Skills',
            to: '/training#crs',
        },
        {
            id: String(id++),
            label: 'Teaching Avalanche Skills Training',
            to: '/instructing-ast',
        },
    ],
}
const MountainInformationNetworkListView = {
    id: String(id++),
    label: 'MIN Reports List View',
    to: '/mountain-information-network/submissions',
}
const MountainInformationNetwork = {
    id: String(id++),
    label: 'Mountain Information Network',
    header: true,
    to: '/mountain-information-network',
    children: [
        {
            id: String(id++),
            label: 'How to GET Information?',
            to: '/mountain-information-network#get-information',
        },
        {
            id: String(id++),
            label: 'How to GIVE Information?',
            to: '/mountain-information-network#give-information',
        },
        {
            id: String(id++),
            label: 'Create a Report',
            to: '/mountain-information-network/submit',
        },
        MountainInformationNetworkListView,
    ],
}
const Planning = {
    id: String(id++),
    label: 'Planning',
    to: '/planning',
    header: true,
    children: [
        MountainWeatherForecast,
        ForecasterBlog,
        TripPlanner,
        Dangerator,
        Gear,
        ForecastRegionsListView,
        WeatherStationsListView,
    ],
}

module.exports = {
    id: String(id++),
    label: 'Avalanche Canada',
    to: '/',
    children: [
        {
            id: String(id++),
            label: 'Backcountry Resources',
            children: [
                Object.assign({}, MountainInformationNetwork, {
                    id: String(id++),
                }),
                Planning,
                {
                    id: String(id++),
                    label: 'Information',
                    to: '/information',
                    header: true,
                    children: [
                        {
                            id: String(id++),
                            label: 'Forecast Archive',
                            to: '/forecasts/archives',
                        },
                        {
                            id: String(id++),
                            label: 'Avalanche Advisory Archive',
                            to: '/advisories/archives',
                        },
                        {
                            id: String(id++),
                            label: 'Avalanche Incident Database',
                            to: '/incidents',
                        },
                    ],
                },
            ],
        },
        {
            id: String(id++),
            label: 'Learn',
            children: [
                {
                    id: String(id++),
                    label: 'Fresh to the Backcountry?',
                    header: true,
                    to: '/start-here',
                    children: [
                        {
                            id: String(id++),
                            label: 'What is avalanche terrain?',
                            to: '/start-here#avalanche-terrain',
                        },
                        {
                            id: String(id++),
                            label: 'What are avalanche conditions?',
                            to: '/start-here#weather-factors',
                        },
                        {
                            id: String(id++),
                            label: 'What does snowpack instability look like?',
                            to: '/start-here#instability-signs',
                        },
                    ],
                },
                Object.assign({}, AvCanTrainingCourses, { id: String(id++) }),
                {
                    id: String(id++),
                    label: 'Online Education',
                    header: true,
                    to: '/education',
                    children: [
                        {
                            id: String(id++),
                            label: 'Online avalanche tutorial',
                            to: '/tutorial',
                        },
                        {
                            id: String(id++),
                            label: 'Cours d’avalanche en ligne (français)',
                            to: '/tutoriel',
                        },
                        {
                            id: String(id++),
                            label: 'Glossary',
                            to: '/glossary',
                        },
                        {
                            id: String(id++),
                            label: 'Rescue at Cherry Bowl',
                            to: 'https://avalanche.ca/cherry-bowl',
                        },
                        {
                            id: String(id++),
                            label: 'Land of Thundering Snow',
                            to: 'http://www.landofthunderingsnow.ca',
                        },
                        {
                            id: String(id++),
                            label: 'Videos',
                            to: 'https://vimeo.com/avalanchecanada',
                        },
                    ],
                },
                {
                    id: String(id++),
                    label: 'Youth Education',
                    header: true,
                    to: '/youth',
                    children: [
                        {
                            id: String(id++),
                            label: 'Teaching Guidelines',
                            to: '/youth#teaching-guidelines',
                        },
                        {
                            id: String(id++),
                            label: 'Our Programs',
                            to: '/youth#programs',
                        },
                        {
                            id: String(id++),
                            label: 'Curriculum & Resources',
                            to: '/youth#curriculum',
                        },
                        {
                            id: String(id++),
                            label: 'External Programs',
                            to: '/youth#external-programs',
                        },
                    ],
                },
            ],
        },
        {
            id: String(id++),
            label: 'Snowmobilers',
            to: '/sled',
            children: [
                {
                    id: String(id++),
                    label: 'Mountain Sledding',
                    header: true,
                    to: '/sled',
                    children: [
                        {
                            id: String(id++),
                            label: 'Avalanche Basics',
                            to: '/sled#avalanche-basics',
                        },
                        {
                            id: String(id++),
                            label: 'Featured Resources',
                            to: '/sled#featured-resources',
                        },
                        {
                            id: String(id++),
                            label: 'Throttle Decisions',
                            to: '/sled#throttle-decisions',
                        },
                        {
                            id: String(id++),
                            label: 'News',
                            to: '/sled#news',
                        },
                        {
                            id: String(id++),
                            label: 'Events',
                            to: '/sled#events',
                        },
                        {
                            id: String(id++),
                            label: 'SledComm',
                            to: '/sled#sledcomm',
                        },
                    ],
                },
                Object.assign({}, MountainInformationNetwork, {
                    id: String(id++),
                }),
                Planning,
                Object.assign({}, AvCanTrainingCourses, { id: String(id++) }),
            ],
        },
        {
            id: String(id++),
            label: 'News & Events',
            children: [
                {
                    id: String(id++),
                    to: '/news',
                    label: 'News',
                    headline: 'Visit our latest News.',
                },
                {
                    id: String(id++),
                    to: '/events',
                    label: 'Events',
                    headline: 'Visit our upcoming Events.',
                },
            ],
        },
        {
            id: String(id++),
            label: 'About',
            children: [
                {
                    id: String(id++),
                    label: 'About',
                    header: true,
                    to: '/about',
                    children: [
                        {
                            id: String(id++),
                            label: 'Annual Reports',
                            to: '/about#annual-reports',
                        },
                        {
                            id: String(id++),
                            label: 'The Aspect Newsletter',
                            to: '/about#newsletters',
                        },
                        {
                            id: String(id++),
                            label: 'Board of Directors',
                            to: '/about#board',
                        },
                        {
                            id: String(id++),
                            label: 'Our Staff',
                            to: '/about#staff',
                        },
                        {
                            id: String(id++),
                            label: 'Service Awards',
                            to: '/about#awards',
                        },
                        {
                            id: String(id++),
                            label: 'Contact Us',
                            to: '/about#contact-us',
                        },
                        {
                            id: String(id++),
                            label: 'Careers',
                            to: '/careers',
                        },
                    ],
                },
                {
                    id: String(id++),
                    label: 'Ambassadors',
                    header: true,
                    to: '/ambassadors',
                },
                {
                    id: String(id++),
                    label: 'Sponsors & Collaborators',
                    header: true,
                    to: '/sponsors',
                    children: [
                        {
                            id: String(id++),
                            label: 'Program Partners',
                            to: 'sponsors#partner',
                        },
                        {
                            id: String(id++),
                            label: 'Premier Sponsors',
                            to: 'sponsors#funding',
                        },
                        {
                            id: String(id++),
                            label: 'Supporters',
                            to: 'sponsors#supplier',
                        },
                        {
                            id: String(id++),
                            label: 'Contributors',
                            to: 'sponsors#associate',
                        },
                        {
                            id: String(id++),
                            label: 'Government Partners',
                            to: 'collaborators#government',
                        },
                        {
                            id: String(id++),
                            label: 'Other Agencies and Organizations',
                            to: 'collaborators#other',
                        },
                    ],
                },
            ],
        },
        {
            id: String(id++),
            label: 'Store',
            to: 'https://store.avalanche.ca',
        },
    ],
}
