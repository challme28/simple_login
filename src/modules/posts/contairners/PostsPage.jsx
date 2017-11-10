import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Posts from '../components/Posts';
import { actions as PostsActions } from "../duck";

function mapStateToProps(state) {
  const { postsReducer } = state;
  const selectedSubreddit = postsReducer.selectedSubreddit;
  const { isFetching, lastUpdated, items: posts }
    = postsReducer[selectedSubreddit] || { isFetching: true, items: [] };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);