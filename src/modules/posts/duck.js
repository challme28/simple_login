import Rx from 'rxjs';

// Actions
const REQUEST_POSTS = 'REQUEST_POSTS';
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
const FETCH_POSTS_IF_NEEDED = 'FETCH_POSTS_IF_NEEDED';

// Action Creators
export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

export function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return {
    type: FETCH_POSTS_IF_NEEDED,
    subreddit
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export const actions = {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  FETCH_POSTS_IF_NEEDED,
  requestPosts,
  receivePosts,
  selectSubreddit,
  invalidateSubreddit,
  fetchPostsIfNeeded
};

// Reducers
export function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state
  }
}

export function posts(state = { isFetching: false, didInvalidate: false, items: [] }, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return { ...state, didInvalidate: true };
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      };
    default:
      return state
  }
}

export function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      };
    default:
      return state
  }
}

// Epic

export function postsEpic(action$, store) {
  return action$.ofType(FETCH_POSTS_IF_NEEDED)
    .filter(action => shouldFetchPosts(store.getState(), action.subreddit))
    .switchMap(action =>
      Rx.Observable.concat(
        Rx.Observable.of(requestPosts(action.subreddit)),
        Rx.Observable.fromPromise(fetch(`https://www.reddit.com/r/${action.subreddit}.json`)
          .then(response => response.json()))
          .map(response => receivePosts(action.subreddit, response))
      ))
}
