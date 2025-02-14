import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'

class DataWipeModal extends Component {
  constructor(props) {
    super(props)

    this.handleConfirm = this.handleConfirm.bind(this)
  }

  async handleConfirm() {
    await this.props.handleDelete()
    this.props.handleHide()
  }

  render() {
    const { show, handleHide, handleDelete } = this.props

    if (handleDelete) {
      return (
        <Modal show={show} onHide={handleHide}>
          <Modal.Header className='bg-light' closeButton>
            <Modal.Title>Confirm Wipe</Modal.Title>
          </Modal.Header>

          <Modal.Body>{'Are you sure you want to wipe the local database?'}</Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={handleHide}>
              Cancel
            </Button>
            <Button variant='success' onClick={this.handleConfirm}>
              Yup!
            </Button>
          </Modal.Footer>
        </Modal>
      )
    } else {
      return null
    }
  }
}

DataWipeModal.propTypes = {
  handleDelete: PropTypes.func,
  handleHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

export default connectModal({ name: 'dataWipe' })(DataWipeModal)
