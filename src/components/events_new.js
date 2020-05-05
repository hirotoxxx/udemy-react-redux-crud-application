import React, { Component } from 'react';
import { connect } from 'react-redux'
// 入力フォームの作成に必用なcomponent
import { Field, reduxForm } from 'redux-form'
// ルーティングを行うパッケージreact-router-dom
import { Link } from 'react-router-dom'
import { postEvent } from '../actions'

class EventsNew extends Component {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this)
	}
	// renderFieldでinputタブの実装を行なっている
	// meta のtouched, errorはredux-form特有のもの
	// touchedは一度でもタッチされたら
	// errorはvalidation errorの文言
	renderField(field) {
		const { input, label, type, meta: { touched, error } } = field

		return (
			<div>
				<input {...input} placeholder={label} type={type} />
				{/* touchedの瞬間にvalidationが動く */}
				{touched && error && <span>{error}</span>}
			</div>)
	}

	async onSubmit(values) {
		// 外部のアクションで定義したアクションクリエイターを呼び出して、その応答を持って↓
		await this.props.postEvent(values)
		console.log(values);
		// historyに履歴を追加している
		this.props.history.push('/')
	}

	render() {
		// renderが実行された時に１番に実行する
		// pristine 未入力状態でsubmitを押下できないようにする
		// submitting　submitが押下されるとtrueになる
		const { handleSubmit, pristine, submitting } = this.props
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<div><Field label='title' name="title" type="text" component={this.renderField} /></div>
				<div><Field label='body' name="body" type="text" component={this.renderField} /></div>

				<div>
					<input type="submit" value="Submit" disabled={pristine || submitting} />
					{/* 一覧画面に戻る */}
					<Link to="/">Cancel</Link>
				</div>
			</form >
		)
	}

}
// validationを定義
const validate = values => {
	const errors = {}
	// title,bodyがそれぞれ空だった場合、エラーを出す
	if (!values.title) errors.title = 'Enter a title, please.'
	if (!values.body) errors.body = 'Enter a body, please.'

	// errorsに入れて返す関数
	return errors
}
const mapDispatchToProps = ({ postEvent })

export default connect(null, mapDispatchToProps)(
	reduxForm({ validate, form: 'eventNewForm' })(EventsNew)
)
