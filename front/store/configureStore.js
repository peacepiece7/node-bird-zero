// version 6로 고정
import { applyMiddleware, createStore, compose } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'

// import reducer from "../reducers"
import reducer from '../reducers'

const configureStore = (context) => {
  console.log('context', context)
  const middlewares = []

  // prettier-ignore
  const enhancer = process.env.NODE_ENV === 'production' 
  ? compose(applyMiddleware(...middlewares)) 
  : composeWithDevTools(applyMiddleware(...middlewares))
  const store = createStore(reducer, enhancer)
  return store
}

const wrapper = createWrapper(configureStore, {
  debug: process.NODE_ENV === 'development' ? true : false,
})

export default wrapper
