import React, { Component } from 'react';
import { connect } from 'react-redux'
// 入力フォームの作成に必用なcomponent
import { Field, reduxForm } from 'redux-form'
// ルーティングを行うパッケージreact-router-dom
import { Link } from 'react-router-dom'
// 更新はputEvent
import { getEvent, deleteEvent, putEvent } from '../actions'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'


class EventsShow extends Component {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this)
		this.onDeleteClick = this.onDeleteClick.bind(this)
	}

	//
	componentDidMount() {
		const { id } = this.props.match.params
		if (id) this.props.getEvent(id)
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
		await this.props.putEvent(values)
		this.props.history.push('/')
	}

	async onDeleteClick() {
		const { id } = this.props.match.params
		await this.props.deleteEvent(id)
		// pristine 未入力状態でsubmitを押下できないようにする
		// submitting　submitが押下されるとtrueになる
		this.props.history.push('/')
	}
	render() {
		const { handleSubmit, pristine, submitting, invalid } = this.props
		const style = { margin: 12 }

		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<div><Field label='title' name="title" type="text" component={this.renderField} /></div>
				<div><Field label='body' name="body" type="text" component={this.renderField} /></div>
				<RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
				<RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />} />
				<RaisedButton label="Delete" style={style} onClick={this.onDeleteClick} />
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

// reducer側のイベント情報をbindする
// 現時点のstate
// コンポーネントが持っているprops
const mapStateToProps = (state, ownProps) => {
	const event = state.events[ownProps.match.params.id]
	return { initialValues: event, event }
}

const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })

export default connect(mapStateToProps, mapDispatchToProps)(
	reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow)
)
