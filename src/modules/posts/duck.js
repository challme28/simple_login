// @flow
import Rx from 'rxjs';
import { ActionsObservable } from "redux-observable";
import type { Store } from 'redux';

// Actions
const REQUEST_POSTS = 'REQUEST_POSTS';
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
const FETCH_POSTS_IF_NEEDED = 'FETCH_POSTS_IF_NEEDED';

type postsActions = {
  +type: string,
  +subreddit: string,
  +posts?: Array<any>,
  +receivedAt?: number,
}

export type postsStateType = {
  +reactjs?: Array<{
    +didInvalidate: boolean,
    +isFetching: boolean,
    +items: [],
    +lastUpdated: number
  }>,
  +frontend?: Array<{
    +didInvalidate: boolean,
    +isFetching: boolean,
    +items: [],
    +lastUpdated: number
  }>,
  +selectedSubreddit: string,
}

// Action Creators
export function selectSubreddit(subreddit: string): postsActions {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit: string): postsActions {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

export function requestPosts(subreddit: string): postsActions {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export function receivePosts(subreddit: string, json: any): postsActions {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function fetchPostsIfNeeded(subreddit: string): postsActions {
  return {
    type: FETCH_POSTS_IF_NEEDED,
    subreddit
  }
}

function shouldFetchPosts(state: postsStateType, subreddit: string): boolean {
  const posts = state[subreddit];
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
export default function reducer(state: postsStateType = { selectedSubreddit: 'reactjs' },
                                action: postsActions): postsStateType {
  let subredditState = { isFetching: false, didInvalidate: false, items: [] };
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        [action.subreddit]: {
          ...subredditState,
          didInvalidate: true
        }
      };
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: {
          ...subredditState,
          isFetching: true,
          didInvalidate: false
        }
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        [action.subreddit]: {
          ...subredditState,
          isFetching: false,
          didInvalidate: false,
          items: action.posts,
          lastUpdated: action.receivedAt
        }
      };
    case SELECT_SUBREDDIT:
      return {
        ...state,
        selectedSubreddit: action.subreddit
      };
    default:
      return state;
  }
}

// Epic
export function postsEpic(action$: ActionsObservable<postsActions>,
                          store: Store<postsStateType, postsActions>) {
  return action$.ofType(FETCH_POSTS_IF_NEEDED)
    .filter(action => shouldFetchPosts(store.getState().postsReducer, action.subreddit))
    .switchMap(action =>
      Rx.Observable.concat(
        Rx.Observable.of(requestPosts(action.subreddit)),
        Rx.Observable.fromPromise(fetch(`https://www.reddit.com/r/${action.subreddit}.json`)
          .then(response => response.json()))
          .map(response => receivePosts(action.subreddit, response))
      ))
}
