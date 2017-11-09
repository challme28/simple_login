import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PostsList extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) => <li key={i}>{post.title}</li>)}
      </ul>
    )
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
};