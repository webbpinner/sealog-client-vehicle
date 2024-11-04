import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getImageUrl, handleMissingImage } from '../utils'
import { Card, Col, Image } from 'react-bootstrap'

class ImageryCard extends Component {
  constructor(props) {
    super(props)

    this.state = { validImage: true }
    this.handleMissingImage = this.handleMissingImage.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleMissingImage(ev) {
    this.setState({ validImage: false })
    handleMissingImage(ev)
  }

  handleOnClick() {
    if (this.state.validImage) {
      this.props.onClick() || null
    }
  }

  render() {
    return (
      <Col className='px-1 pb-2' key={this.props.source} sm={this.props.sm || 6} md={this.props.md || 4} lg={this.props.lg || 3}>
        <Card className='event-image-data-card' id={`image_${this.props.source}`}>
          <Image fluid onError={this.handleMissingImage} src={this.props.filepath} onClick={this.handleOnClick} />
          <span>{this.props.source}</span>
        </Card>
      </Col>
    )
  }
}

ImageryCard.propTypes = {
  source: PropTypes.string.isRequired,
  filepath: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number
}

class ImageryCards extends Component {
  render() {
    let imageryCards = []
    this.props.framegrab_data_sources.forEach((framegrab_data_source) => {
      for (let j = 0; j < framegrab_data_source.data_array.length; j += 2) {
        const source = framegrab_data_source.data_array[j].data_value
        const filepath = framegrab_data_source.data_array[j + 1].data_value
        imageryCards.push(
          <ImageryCard
            source={source}
            filepath={getImageUrl(filepath)}
            onClick={() => this.props.onClick(source, filepath)}
            key={`${framegrab_data_source.data_source}_${j}_col`}
            sm={this.props.sm}
            md={this.props.md}
            lg={this.props.lg}
          />
        )
      }
    })

    return imageryCards
  }
}

ImageryCards.propTypes = {
  framegrab_data_sources: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number
}

export default ImageryCards
