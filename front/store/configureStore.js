// version 6로 고정
import { createWrapper } from 'next-redux-wrapper'
import { createStore } from 'redux'
import reducer from '../reducers/index'

const configureStore = () => {
  const store = createStore(reducer)
  return store
}

const wrapper = createWrapper(configureStore, {
  //   debug: process.NODE_ENV === 'development',
  debug: true,
})

export default wrapper
