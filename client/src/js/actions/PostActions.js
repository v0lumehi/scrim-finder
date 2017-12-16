export const REQUEST_POSTS = 'REQUEST_POSTS';
export function requestPosts(filters) {
	return {
		type: REQUEST_POSTS,
		filters
	}
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export function receivePosts(filters, posts) {
	return {
		type: RECEIVE_POSTS,
		filters,
		posts,
		receivedAt: Date.now()
	}
}

export function fetchPosts(filters = null) {
	return async function(dispatch) {
		dispatch(requestPosts(filters));

		console.log(filters);
		const query = encodeURIComponent(JSON.stringify(filters));
		const response = await fetch('/api/posts?filters=' + query);
		const json = await response.json();

		dispatch(receivePosts(filters, json));
	}
}
