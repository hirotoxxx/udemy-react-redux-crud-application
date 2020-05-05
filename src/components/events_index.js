import React, { Component } from 'react';
import { connect } from 'react-redux'
// 繰り返しの処理をするのでlodash
import _ from 'lodash'
// ルーティングを行うパッケージreact-router-dom
import { Link } from 'react-router-dom'
import { readEvents } from '../actions'

class EventsIndex extends Component {
  // コンポーネントがマウントされた時に呼ばれるメソッド
  componentDidMount() {
    //　イベントを取得するような複雑な処理はcomponentsに書かずに外に書く
    this.props.readEvents()
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      <tr key={event.id}>
        <td>{event.id}</td>
        <td>
          {/* event.id動的に取得して、画面遷移するようにする */}
          {/* バックコーテーション */}
          <Link to={`/events/${event.id}`}>
            {event.title}
          </Link>
        </td>
        <td>{event.body}</td>
      </tr>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>

          <tbody>
            {this.renderEvents()}
          </tbody>
        </table>
        {/* <div>noifafjwioajfmojafkl;j;;;</div> */}
        <Link to="/events/new">New Events</Link>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({ events: state.events })

const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)
