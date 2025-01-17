import React, { useMemo } from 'react'
import { Link } from '@reach/router'
import format from 'date-fns/format'
import { feed } from 'prismic/params'
import { Page, Content, Header, Main } from 'components/page'
import { Loading, Muted } from 'components/text'
import Shim from 'components/Shim'
import Pagination from 'components/pagination'
import EntrySet from './EntrySet'
import Entry from './Entry'
import TagTitle from './TagTitle'
import { DropdownFromOptions as Dropdown } from 'components/controls'
import { ControlSet, Control } from 'components/form'
import { NEWS, EVENT, BLOG } from 'constants/prismic'
import { GRAY_LIGHTEST } from 'constants/colors'
import { useSearch, useTags } from 'prismic/hooks'
import useParams, {
    NumberParam,
    StringParam,
    PageParam,
    SetParam,
    BooleanParam,
} from 'hooks/params'
import { useLocation } from 'router/hooks'

export function BlogPostFeed({ navigate }) {
    const [params, stringify] = useParams({
        page: PageParam,
        year: NumberParam,
        month: StringParam,
        category: StringParam,
    })
    const changeHandler = useChangeHandlerFactory(navigate, stringify)

    return (
        <FeedLayout title="Blogs">
            <ControlSet horizontal>
                <Control style={CONTROL_STYLE}>
                    <Dropdown
                        value={params.category}
                        onChange={changeHandler('category', 1)}
                        options={CategoryOptions}
                        placeholder={CategoryOptions.get()}
                    />
                </Control>
                <Control style={CONTROL_STYLE}>
                    <Dropdown
                        value={params.year}
                        onChange={changeHandler('year', 1)}
                        options={YearOptions}
                        placeholder={YearOptions.get()}
                    />
                </Control>
                <Control style={CONTROL_STYLE}>
                    <Dropdown
                        value={params.month}
                        onChange={changeHandler('month', 1)}
                        options={MonthsOptions}
                        placeholder={MonthsOptions.get()}
                    />
                </Control>
            </ControlSet>
            <FeedContent
                params={feed.blog(params)}
                type={BLOG}
                onPageChange={changeHandler('page')}
            />
        </FeedLayout>
    )
}

export function NewsFeed({ navigate }) {
    const [params, stringify] = useParams({
        page: PageParam,
        year: NumberParam,
        month: StringParam,
        tags: SetParam,
    })
    const changeHandler = useChangeHandlerFactory(navigate, stringify)

    return (
        <FeedLayout title="Recent news">
            <ControlSet horizontal>
                <Control style={CONTROL_STYLE}>
                    <Dropdown
                        value={params.year}
                        onChange={changeHandler('year', 1)}
                        options={YearOptions}
                        placeholder={YearOptions.get()}
                    />
                </Control>
                <Control style={CONTROL_STYLE}>
                    <Dropdown
                        value={params.month}
                        onChange={changeHandler('month', 1)}
                        options={MonthsOptions}
                        placeholder={MonthsOptions.get()}
                    />
                </Control>
                <Control style={CONTROL_STYLE}>
                    <TagsDropdown
                        type={NEWS}
                        value={params.tags}
                        onChange={changeHandler('tags', 1)}
                    />
                </Control>
            </ControlSet>
            <FeedContent
                type={NEWS}
                params={feed.news(params)}
                onPageChange={changeHandler('page')}
            />
        </FeedLayout>
    )
}

export function EventFeed({ navigate }) {
    const [params, stringify] = useParams({
        page: PageParam,
        past: BooleanParam,
        tags: SetParam,
    })
    const changeHandler = useChangeHandlerFactory(navigate, stringify)

    return (
        <FeedLayout title="Events">
            <ControlSet horizontal>
                <Control style={CONTROL_STYLE}>
                    <Dropdown
                        value={params.past}
                        onChange={changeHandler('past', 1)}
                        options={TimelineOptions}
                        placeholder={TimelineOptions.get(params.past)}
                    />
                </Control>
                <Control style={CONTROL_STYLE}>
                    <TagsDropdown
                        type={EVENT}
                        value={params.tags}
                        onChange={changeHandler('tags', 1)}
                    />
                </Control>
            </ControlSet>
            <FeedContent
                type={EVENT}
                params={feed.events(params)}
                onPageChange={changeHandler('page')}
            />
        </FeedLayout>
    )
}

// Components
function FeedLayout({ title, children }) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>{children}</Main>
            </Content>
        </Page>
    )
}
function FeedContent({ params, type, onPageChange }) {
    const { location } = useLocation()
    const [data = {}, pending] = useSearch(params)
    const { results = [], page, total_pages } = data
    let rearranged = results

    if (page === 1 && rearranged.some(isFeaturedPost)) {
        const featured = rearranged.find(isFeaturedPost)

        rearranged = rearranged.filter(post => featured !== post)

        rearranged.unshift(featured)
    }

    return (
        <Shim vertical>
            {pending ? (
                <Loading />
            ) : results.length === 0 ? (
                <Muted>
                    No {TYPE_TEXT.get(type)} match your criteria. You can{' '}
                    <Link to={location.pathname}>reset your criteria</Link> to
                    find more articles.
                </Muted>
            ) : null}
            <EntrySet>
                {rearranged.map(post => (
                    <Entry key={post.uid} {...post} />
                ))}
            </EntrySet>
            <Pagination
                active={page}
                onChange={onPageChange}
                total={total_pages}
            />
        </Shim>
    )
}
function TagsDropdown({ type, value, onChange }) {
    const [tags] = useTags(type)
    const options = useMemo(
        () =>
            new Map(
                Array.from(tags || [], tag => [tag, <TagTitle value={tag} />])
            ),
        [tags]
    )

    return (
        <Dropdown
            value={value}
            onChange={onChange}
            options={options}
            placeholder="All tags"
        />
    )
}

// Constants
const CURRENT_YEAR = new Date().getFullYear()
const TYPE_TEXT = new Map([[BLOG, 'blog'], [NEWS, 'news'], [EVENT, 'event']])
const YearOptions = new Map([
    [undefined, 'All years'],
    ...Array(CURRENT_YEAR - 2012) // We are are going back to 2013!
        .fill(CURRENT_YEAR)
        .map((value, index) => value - index)
        .map(year => [year, String(year)]),
])
const MonthsOptions = new Map([
    [undefined, 'All Months'],
    ...Array(12)
        .fill(0)
        .map((value, index) => format(new Date(1, index, 1), 'MMMM'))
        .map(string => [string.toLowerCase(), string]),
])

const TimelineOptions = new Map([
    [false, 'Upcoming events'],
    [true, 'Past events'],
])
const CategoryOptions = new Map([
    ['forecaster blog', 'Forecaster blog'],
    ['north-rockies', 'North Rockies'],
    ['south-rockies', 'South Rockies'],
    ['yukon', 'Yukon'],
    [undefined, 'All categories'],
])

// Utils
function isFeaturedPost({ tags }) {
    return tags.includes('featured')
}

// That super awesome function could be moved to "hooks/params" to generate handlers...
// But need some experience with it to know exactly what these handlers should do
function useChangeHandlerFactory(navigate, stringify) {
    return function(key, page) {
        return function(value) {
            return navigate(stringify({ page, [key]: value }))
        }
    }
}

// Styles
const CONTROL_STYLE = {
    borderBottom: '2px solid ' + GRAY_LIGHTEST,
    margin: 0,
    padding: '0.5em',
}
