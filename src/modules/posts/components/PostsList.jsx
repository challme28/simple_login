// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'

type Props = {
  +posts: Array<any>
}
export default class PostsList extends Component<Props> {
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