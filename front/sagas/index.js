import { all, fork } from 'redux-saga/effects'

// call = sync , fork = async(non-blocking)

import postSaga from './post'
import userSaga from './user'

function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)])
}

export default rootSaga
