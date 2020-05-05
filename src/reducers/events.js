//　配列のデータを編集するパッケージ
import _ from 'lodash'
import {
  CREATE_EVENT,
  READ_EVENTS,
  READ_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from '../actions'

export default (events = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT:
    case READ_EVENT:
    case UPDATE_EVENT:
      console.log("reducerの方はきている")
      const data = action.response.data
      console.log(data)
      return { ...events, [data.id]: data }
    case READ_EVENTS:
      // lodashを使用して配列を編集
      // idをkeyにして再配置する
      return _.mapKeys(action.response.data, 'id')
    case DELETE_EVENT:
      delete events[action.id]
      // 新しいメモリ空間にアップデートされたイベントのオブジェクトを返してくれる
      return { ...events }
    default:
      return events
  }
}
