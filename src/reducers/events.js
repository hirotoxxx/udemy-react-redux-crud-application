//　配列のデータを編集するパッケージ
import _ from 'lodash'
import { READ_EVENTS } from '../actions'

export default (events = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      // lodashを使用して配列を編集
      // idをkeyにして再配置する
      return _.mapKeys(action.response.data, 'id')
    default:
      return events
  }
}
