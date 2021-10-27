// version 6로 고정
import { createWrapper } from 'next-redux-wrapper'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// import reducer from "../reducers"
import reducer from '../reducers/index'

const configureStore = () => {
  const middlewares = []
  console.log(process.env.NODE_ENV)

  // prettier-ignore
  const enhancer = process.env.NODE_ENV === 'production' 
  ? compose(applyMiddleware(...middlewares)) 
  : composeWithDevTools(applyMiddleware(...middlewares))
  const store = createStore(reducer, enhancer)
  return store
}

const wrapper = createWrapper(configureStore, {
  //   debug: process.NODE_ENV === 'development',
  debug: true,
})

export default wrapper