import React from 'react';
import ReactDOM from 'react-dom';
// thunkはmkddlewareなのでreduxからimportしておく
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// アクションで関数を返せるようになる
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './index.css';
import reducer from './reducers';
// TOP画面のEvents
import EventsIndex from './components/events_index';
// 新規作成画面のイベント
import EventsNew from './components/events_new';
// NewEventsを作成する画面
// import EventNew from './components/events_new';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/events/new" component={EventsNew} />
        <Route exact path="/" component={EventsIndex} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
