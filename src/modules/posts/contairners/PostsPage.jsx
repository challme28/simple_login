// @flow
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Posts from '../components/Posts';
import { actions as PostsActions } from "../duck";

import type { postsStateType } from "../duck";

type postsReducer = {
  postsReducer: postsStateType;
}

function mapStateToProps(state: postsReducer): postsStateType {
  const { postsReducer } = state;
  const selectedSubreddit = postsReducer.selectedSubreddit;
  const { isFetching, lastUpdated, items: posts }
    = postsReducer[selectedSubreddit] || { isFetching: true, items: [], lastUpdated: null };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

function mapDispatchToProps(dispatch: Function): {} {
  return bindActionCreators(PostsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);