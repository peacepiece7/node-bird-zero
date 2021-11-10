import { all, fork, call, take, put } from 'redux-saga'
import axios from 'axios'
// call = sync , fork = async(non-blocking)

function* logIn() {
  try {
    const result = yield call(logInApi)
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    })
  } catch (err) {
    console.log(err)
  }
}
function logInApi() {
  return axios.post('/api/login')
}
