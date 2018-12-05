import React from 'react'
import { memo } from 'utils/react'

function AdviceText() {
    return (
        <div>
            <p>To minimize risk, always:</p>
            <ul>
                <li>Expose only one person at a time in avalanche terrain.</li>
                <li>
                    Group up only in safe locations well away from avalanche
                    runout zones.
                </li>
                <li>Avoid terrain traps whenever possible.</li>
            </ul>
            <p>
                And while this advisory is valid follow the travel advice below.
            </p>
        </div>
    )
}

export default memo.static(AdviceText)
