// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Picker from '../components/Picker'
import PostsList from '../components/PostsList'

type Props = {
  +fetchPostsIfNeeded: Function,
  +selectSubreddit: Function,
  +invalidateSubreddit: Function,
  +selectedSubreddit: string,
  +posts: Array<any>,
  +isFetching: boolean,
  +lastUpdated?: number,
}
export default class Posts extends React.Component<Props> {
  componentDidMount() {
    const { fetchPostsIfNeeded, selectedSubreddit } = this.props;
    fetchPostsIfNeeded(selectedSubreddit);
  }

  handleChange(event: SyntheticEvent<HTMLSelectElement>) {
    const nextSubreddit = event.currentTarget.value;
    const { fetchPostsIfNeeded, selectSubreddit } = this.props;
    selectSubreddit(nextSubreddit);
    fetchPostsIfNeeded(nextSubreddit);
  }

  handleRefreshClick(event: Event) {
    event.preventDefault();
    const { fetchPostsIfNeeded, invalidateSubreddit, selectedSubreddit } = this.props;
    invalidateSubreddit(selectedSubreddit);
    fetchPostsIfNeeded(selectedSubreddit);
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker options={['reactjs', 'frontend']}
                value={selectedSubreddit}
                onChange={(value) => this.handleChange(value)}/>
        <p>
          {lastUpdated &&
          <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
            {' '}
          </span>}
          {!isFetching &&
          <a href="#" onClick={event => this.handleRefreshClick(event)}>
            Refresh
          </a>}
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 &&
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <PostsList posts={posts}/>
        </div>}
      </div>
    )
  }
}

Posts.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
};