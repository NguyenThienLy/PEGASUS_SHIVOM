import React from 'react'

import App, { Container } from 'next/app'

import { Provider } from 'react-redux'

import { configureStore } from '../store'

import withReduxStore from '../lib/withReduxStore'

import './app.scss'
class ReviewApp extends App {
    render () {
        const { Component, pageProps, reduxStore } = this.props
        return (
          <Container>
            <Provider store={reduxStore}>
              <Component {...pageProps} />
            </Provider>
          </Container>
        )
      }
}

export default withReduxStore(ReviewApp)

