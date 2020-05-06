import React, { Component } from 'react';
import { connect } from 'react-redux'
// 入力フォームの作成に必用なcomponent
import { Field, reduxForm } from 'redux-form'
// ルーティングを行うパッケージreact-router-dom
import { Link } from 'react-router-dom'
import { postEvent } from '../actions'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

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
			<TextField
				hintText={label}
				floatingLabelText={label}
				type={type}
				errorText={touched && error}
				{...input}
				fullWidth={true}
			/>
		)
	}

	async onSubmit(values) {
		// 外部のアクションで定義したアクションクリエイターを呼び出して、その応答を持って↓
		await this.props.postEvent(values)
		// historyに履歴を追加している
		this.props.history.push('/')
	}

	render() {
		// renderが実行された時に１番に実行する
		// pristine 未入力状態でsubmitを押下できないようにする
		// submitting　submitが押下されるとtrueになる
		const { handleSubmit, pristine, submitting, invalid } = this.props
		const style = { margin: 12 }

		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<div><Field label='title' name="title" type="text" component={this.renderField} /></div>
				<div><Field label='body' name="body" type="text" component={this.renderField} /></div>
				<RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
				<RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />} />
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
