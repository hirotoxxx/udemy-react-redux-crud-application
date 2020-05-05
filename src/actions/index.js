//外部のAPIサーバーへhhtpリクエスト送信
import axios from 'axios'

// typeの識別子であるincrement,decrementはreducerでも使うため、一箇所で文字列として定義し、再利用可能にしておく
// reducerで活用するためexportする
export const READ_EVENTS = 'READ_EVENTS'
export const READ_EVENT = 'READ_EVENT'
export const CREATE_EVENT = 'CREATE_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'

// イベントの取得・作成・更新・削除のURL
const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1'
const QUERYSTRING = '?token=token123'

// アクションを返す関数(アクションクリエイター)
// componentsで使うためにexportする
// 非同期処理では本来許されないが、thunkを使えば可能になる
// actionの代わりに関数を返せるようになる
// dispatchを引数に使えるようになる
export const readEvents = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`)
  dispatch({ type: READ_EVENTS, response })
}

// componentのevents_new.jsで取得したtitle,bodyをvaluesで受け取っている
// axios.postで保存処理を行なっている  。
export const postEvent = values => async dispatch => {
  const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values)
  dispatch({ type: CREATE_EVENT, response })
}

export const putEvent = values => async dispatch => {
  console.log(values)
  console.log('==========')
  const response = await axios.put(`${ROOT_URL}/events/${values.id}${QUERYSTRING}`, values)
  dispatch({ type: UPDATE_EVENT, response })
}

export const getEvent = id => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/events/${id}${QUERYSTRING}`)
  dispatch({ type: READ_EVENT, response })
}

export const deleteEvent = id => async dispatch => {
  await axios.delete(`${ROOT_URL}/events/${id}${QUERYSTRING}`)
  dispatch({ type: DELETE_EVENT, id })
}
