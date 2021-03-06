import RequestService from '../services/requestService';
import Constants from '../common/constants';

export function getPosts() {
  const url = RequestService.handlev1_1BaseRequestPosts(`posts/new`);

  return fetch(url, {
    method: 'GET'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return json;
      });
    } else {
      return response.json().then(() => {
        return [];
      });
    }
  });
}

// New posts
//https://steepshot.org/api/v1/posts/top?limit=10&offset=/reiki-trail/@reiki-trail/reiki-boost-healing-invocation-9
export function getNewPosts(offset) {
  const url = RequestService.handlev1_1BaseRequestPosts(`posts/new`, {
    offset: offset
  });

  return fetch(url, {
    method: 'GET'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return json;
      });
    } else {
      return response.json().then(() => {
        return [];
      });
    }
  });
}

// Traiding posts
//https://steepshot.org/api/v1/posts/top?limit=10&offset=/reiki-trail/@reiki-trail/reiki-boost-healing-invocation-9
export function getTopPosts(offset) {
  const url = RequestService.handlev1_1BaseRequestPosts(`posts/top`, {
    offset: offset
  });
  
  return fetch(url, {
    method: 'GET'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return json;
      });
    } else {
      return response.json().then(() => {
        return [];
      });
    }
  });
}

// Hot posts
//https://steepshot.org/api/v1/posts/hot?limit=10&offset=/reiki-trail/@reiki-trail/reiki-boost-healing-invocation-9
export function getHotPosts(offset) {
  const url = RequestService.handlev1_1BaseRequestPosts(`posts/hot`, {
    offset: offset
  });

  return fetch(url, {
    method: 'GET'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return json;
      });
    } else {
      return response.json().then(() => {
        return [];
      });
    }
  });
}


//https://steepshot.org/api/v1/post/joseph//steemfest/@joseph/win-a-free-trip-to-lisbon-portugal-to-attend-steemfest-ii/comments
export function getPostComments(author, authorUrl) {
  const url = RequestService.handlev1_1BaseRequestPosts(`post/${author}/${authorUrl}/comments`);
  return fetch(url, {
    method: 'GET'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return json;
      });
    } else {
      return response.json().then(() => {
        return [];
      });
    }
  });
}

/// <summary>
///     Examples:
///     1) GET https://steepshot.org/api/v1/user/joseph.kalu/posts HTTP/1.1
///     2) GET https://steepshot.org/api/v1/user/joseph.kalu/posts?
///            offset=%2Fcat1%2F%40joseph.kalu%2Fcat636203389144533548
///            &limit=3 HTTP/1.1
///            Cookie: sessionid=q9umzz8q17bclh8yvkkipww3e96dtdn3
/// </summary>

export function getUserPosts(author, offset) {
  const url = RequestService.handlev1_1BaseRequestPosts(`user/${author}/posts`, {
    offset: offset
  });

  return fetch(url, {
    method: 'GET'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return json;
      });
    } else {
      return response.json().then(() => {
        return [];
      });
    }
  });
}

/// <summary>
///     Examples:
///     1) GET https://steepshot.org/api/v1/user/joseph.kalu/posts HTTP/1.1
///     2) GET https://steepshot.org/api/v1/user/joseph.kalu/posts?
///            offset=%2Fcat1%2F%40joseph.kalu%2Fcat636203389144533548
///            &limit=3 HTTP/1.1
///            Cookie: sessionid=q9umzz8q17bclh8yvkkipww3e96dtdn3
/// </summary>

export function getUserFeed(author, offset) {
  const url = RequestService.handlev1_1BaseRequestPosts('recent/posts', {
    offset: offset
  });
  console.log(url);
  return fetch(url, {
    method: 'GET'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return json;
      });
    } else {
      return response.json().then(() => {
        return [];
      });
    }
  });
}


// New posts by category
/// <summary>
///     Examples:
///     1) GET https://steepshot.org/api/v1/posts/food/new HTTP/1.1
///     2) GET https://steepshot.org/api/v1/posts/food/new?
///            offset=%2Ftravel%2F%40sweetsssj%2Ftravel-with-me-39-my-appointment-with-gulangyu
///            &limit=5 HTTP/1.1
/// </summary>
export function getNewPostsByCategory(category, offset) {
  category = category.replace(/[^A-Za-zА-Яа-яЁё(\d)+]/g, "")

  const url = RequestService.handlev1_1BaseRequestPosts(`posts/${category}`, {
    offset: offset
  });
  return fetch(url, {
    method: 'GET'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return json;
      });
    } else {
      return response.json().then(() => {
        return [];
      });
    }
  });
}

// Top posts by category
/// <summary>
///     Examples:
///     1) GET https://steepshot.org/api/v1/posts/food/top HTTP/1.1
///     2) GET https://steepshot.org/api/v1/posts/food/top?
///            offset=%2Ftravel%2F%40sweetsssj%2Ftravel-with-me-39-my-appointment-with-gulangyu
///            &limit=5 HTTP/1.1
/// </summary>
export function getTopPostsByCategory(category, offset) {
  category = category.replace(/[^A-Za-zА-Яа-яЁё(\d)+]/g, "");

  const url = RequestService.handlev1_1BaseRequestPosts(`posts/${category}`, {
    offset: offset
  });
  return fetch(url, {
    method: 'GET'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return json;
      });
    } else {
      return response.json().then(() => {
        return [];
      });
    }
  });
}

// Hot posts by category
/// <summary>
///     Examples:
///     1) GET https://steepshot.org/api/v1/posts/food/hot HTTP/1.1
///     2) GET https://steepshot.org/api/v1/posts/food/hot?
///            offset=%2Ftravel%2F%40sweetsssj%2Ftravel-with-me-39-my-appointment-with-gulangyu
///            &limit=5 HTTP/1.1
/// </summary>
export function getHotPostsByCategory(category, offset) {
  category = category.replace(/[^A-Za-zА-Яа-яЁё(\d)+]/g, "")

  const url = RequestService.handlev1_1BaseRequestPosts(`posts/${category}/hot`, {
    offset: offset
  });

  return fetch(url, {
    method: 'GET'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return json;
      });
    } else {
      return response.json().then(() => {
        return [];
      });
    }
  });
}

export function getPostShaddow(urlPost) {
  const url = RequestService.handlev1_1BaseRequestPost(`post/${urlPost}/info`);
  
  return fetch(url, {
    method: 'GET'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return json;
      });
    } else {
      return response.json().then(() => {
        return null;
      });
    }
  });
}
