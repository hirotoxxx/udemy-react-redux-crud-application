import React, { Component } from 'react';
import { connect } from 'react-redux'
// ルーティングを行うパッケージreact-router-dom
import { link } from 'react-router-dom'
// import { postEvents } from '../actions'

class EventsNew extends Component {
  render() {
    return (
      <React.Fragment>
        <div>newwwwww</div>
      </React.Fragment>
    )
  }
}

// const mapDispatchToProps = ({ postEvents })

export default connect(null, null)(EventsNew)
