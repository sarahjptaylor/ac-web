import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'
import Bundle from 'components/Bundle'
import loadSubmit from 'bundle-loader?lazy!containers/min/Form'
import Submission from 'layouts/Submission'
import SubmissionList from 'layouts/SubmissionList'
import { Loading } from 'components/text'
import { StaticPage } from 'prismic/layouts'
import { Page, Content } from 'components/page'
import * as utils from 'utils/search'

export default function MountainInformationNetwork() {
    return (
        <Router>
            <Submit path="submit" />
            <Submissions path="submissions" />
            <Submission path="submissions/:id" />
            <StaticPage
                path="submission-guidelines"
                uid="mountain-information-network-submission-guidelines"
                title="Mountain Information Network — Submission Guidelines"
            />
            <StaticPage
                path="faq"
                uid="mountain-information-network-faq"
                title="Mountain Information Network — FAQ"
            />
            <StaticPage
                path="/"
                uid="mountain-information-network-overview"
                title="Mountain Information Network — Overview"
            />
        </Router>
    )
}

function Submit(props) {
    return (
        <Bundle load={loadSubmit}>
            {module =>
                module ? (
                    <module.default {...props} />
                ) : (
                    <Page>
                        <Content>
                            <h1>
                                <Loading />
                            </h1>
                        </Content>
                    </Page>
                )
            }
        </Bundle>
    )
}

class Submissions extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        navigate: PropTypes.func.isRequired,
    }
    handleParamsChange = async params => {
        const search = Object.assign({}, this.params, params)
        const to = utils.stringify({
            ...search,
            sorting: search.sorting
                ? utils.formatSorting(search.sorting)
                : undefined,
        })

        await this.props.navigate(to)
    }
    get params() {
        const { search } = this.props.location
        const { days, types, regions, sorting } = utils.parse(search)

        return {
            days: utils.toNumber(days),
            types: utils.toSet(types),
            regions: utils.toSet(regions),
            sorting: utils.parseSorting(sorting),
        }
    }
    render() {
        return (
            <SubmissionList
                {...this.params}
                onParamsChange={this.handleParamsChange}
            />
        )
    }
}
