//外部のAPIサーバーへhhtpリクエスト送信
import axios from 'axios'

// typeの識別子であるincrement,decrementはreducerでも使うため、一箇所で文字列として定義し、再利用可能にしておく
// reducerで活用するためexportする
export const READ_EVENTS = 'READ_EVENTS'

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
