import React, { Fragment } from 'react'
import Head from 'next/head'

const PageHead = ({title}) => {
    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel='manifest' href='/manifest.json' />
                <link rel="icon" href="/iconx/favicon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/iconx/apple-touch-icon.png"/>
                <link rel="manifest" href="/iconx/manifest.json" />
            </Head>
        </Fragment>
    )
}

export default PageHead
