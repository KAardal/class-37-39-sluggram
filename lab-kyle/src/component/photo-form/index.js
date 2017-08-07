import React from 'react'
import * as util from '../../lib/util.js'

class PhotoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.photo
      ? props.photo
      : {
        url: null,
        description: '',
        preview: '',
      }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let { value, name } = e.target

    if (name === 'description') this.setState({ description: value })

    if (name === 'url') {
      let url = e.target.files[0]

      this.setState({ url })
      util
        .photoToDataURL(url)
        .then(preview => this.setState({ preview }))
        .catch(console.error)
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onComplete(this.state)
  }

  render() {
    console.log('photoform render', this.props.editing)
    return (
      <div className="photo-form">
        <form onSubmit={this.handleSubmit}>
          {util.renderIf(
            this.props.editing !== 'true',
            <div>
              <img src={this.state.preview} />
              <input type="file" name="url" onChange={this.handleChange} />
            </div>
          )}
          <textarea
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <button type="submit"> Submit </button>
        </form>
      </div>
    )
  }
}

export default PhotoForm
