import React from 'react'
import { connect } from 'react-redux'

import {
  photoDeleteRequest,
  photoUpdateRequest,
} from '../../action/photo-actions.js'
import PhotoForm from '../photo-form'
import * as util from '../../lib/util.js'

class Photo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editing: false }

    this.handlePhotoUpdate = this.handlePhotoUpdate.bind(this)
    this.handlePhotoDelete = this.handlePhotoDelete.bind(this)
  }

  handlePhotoUpdate(photo) {
    return this.props.photoUpdate(photo).catch(console.error)
  }

  handlePhotoDelete() {
    return this.props.photoDelete(this.props.photo).catch(console.error)
  }

  render() {
    return (
      <div className="photo">
        <img src={this.props.photo.url} />
        <p>{this.props.photo.description}</p>
        {util.renderIf(
          this.state.editing,
          <div>
            <PhotoForm
              onComplete={this.handlePhotoUpdate}
              photo={this.props.photo}
              editing="true"
            />
            <i
              onClick={this.handlePhotoDelete}
              className="fa fa-trash-o fa-3x"
            />
          </div>
        )}
        <i
          onClick={() => this.setState({ editing: !this.state.editing })}
          className="fa fa-pencil fa-3x"
        />
      </div>
    )
  }
}

let mapStateToProps = () => ({})
let mapDispatchToProps = dispatch => ({
  photoDelete: photo => dispatch(photoDeleteRequest(photo)),
  photoUpdate: photo => dispatch(photoUpdateRequest(photo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Photo)
