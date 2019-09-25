import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from "../store"

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return configureStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = configureStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default App => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore()

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore
      let originalUrl = appContext.ctx.req.originalUrl
      let locals = appContext.ctx.req.locals || {}
      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
        originalUrl,
        context: locals.context || {}
      }
    }

    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render() {
      console.log("original url: ", this.props.originalUrl)
      console.log("context: ", this.props.context)
      if (isServer) {
        const { StaticRouter } = require('react-router');
        return (
          <StaticRouter
            location={this.props.originalUrl}
            context={this.props.context}
          >
            <App {...this.props} reduxStore={this.reduxStore} />
          </StaticRouter>
        );
      }
      return (
        <BrowserRouter>
          <App {...this.props} reduxStore={this.reduxStore} />
        </BrowserRouter>
      );
      // return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }
}