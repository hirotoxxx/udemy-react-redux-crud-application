import React from 'react';
import ReactDOM from 'react-dom';
// thunkはmkddlewareなのでreduxからimportしておく
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// アクションで関数を返せるようになる
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// debugするためのパッケージ
import { composeWithDevTools } from 'redux-devtools-extension'

import './index.css';
import reducer from './reducers';
// TOP画面のEvents
import EventsIndex from './components/events_index';
// 新規作成画面のイベント
import EventsNew from './components/events_new';
// 更新処理or削除処理
import EventsShow from './components/events_show';
// NewEventsを作成する画面
// import EventNew from './components/events_new';
import registerServiceWorker from './registerServiceWorker';

const enhancer = process.env.NODE_ENV === 'development' ?
  composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
const store = createStore(reducer, enhancer)

ReactDOM.render(
  <Provider store={store}>
    {/* ルーティングの設定 */}
    <BrowserRouter>
      <Switch>
        <Route path="/events/new" component={EventsNew} />
        {/* 動的なパラメーターにする場合:idのように:を使用する必用がある */}
        <Route path="/events/:id" component={EventsShow} />
        <Route exact path="/" component={EventsIndex} />
        <Route exact path="/events" component={EventsIndex} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
