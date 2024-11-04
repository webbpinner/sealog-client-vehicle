import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Path from 'path'
import { Modal, Image } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { handleMissingImage, getImageUrl } from '../utils'

class ImagePreviewModal extends Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.props.handleHide()
  }

  render() {
    const { show, handleHide, handleDownload, name } = this.props

    if (name) {
      return (
        <Modal size='lg' show={show} onHide={handleHide}>
          <Modal.Header className='bg-light' closeButton>
            <Modal.Title as='h5'>
              Image Preview - {Path.basename(this.props.filepath)}{' '}
              {/*<FontAwesomeIcon onClick={() => handleDownload(this.props.filepath)} className='text-primary' icon='download' fixedWidth />*/}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='text-center'>
              <Image fluid src={getImageUrl(this.props.filepath)} onError={handleMissingImage} />
            </div>
          </Modal.Body>
        </Modal>
      )
    } else {
      return null
    }
  }
}

ImagePreviewModal.propTypes = {
  name: PropTypes.string,
  filepath: PropTypes.string,
  handleHide: PropTypes.func.isRequired,
  handleDownload: PropTypes.func,
  show: PropTypes.bool.isRequired
}

export default connectModal({ name: 'imagePreview' })(ImagePreviewModal)
