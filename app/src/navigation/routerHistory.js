import { createMemoryHistory } from 'history';
import {
  Route,
  Router,
  Prompt,
  Redirect,
  Switch,
  withRouter,
} from 'react-router';

let position = '#';
let history = createMemoryHistory();

let nowHistory = {
  index: 0,
  length: 1,
  pathname: '/',
  search: '',
  hash: '',
  state: undefined,
  key: '',
};

let historyListenFuncs = {};
let historyListenFuncsLength = 0;
let historyAddListen = func => {
  historyListenFuncsLength += 1;
  historyListenFuncs[historyListenFuncsLength] = func;
  return historyListenFuncsLength;
};
let historyRemoveListen = i => {
  historyListenFuncs[i] = undefined;
};
history.listen(e => {
  try {
    if (nowHistory.key !== e.key) {
      nowHistory = {
        index: history.index,
        length: history.length,
        pathname: e.pathname,
        search: e.search,
        hash: e.hash,
        state: e.state,
        key: e.key,
      };
      if (window.location) {
        window.location.href = position + e.pathname;
      }
    }
    for (let key in historyListenFuncs) {
      if (historyListenFuncs[key]) {
        historyListenFuncs[key](history, e);
      }
    }
  } catch (err) {
    // err
  }
});

//Listening trigger
function hashChange() {
  try {
    let lastPathname = window.location.href.split(position)[1];
    if (lastPathname !== nowHistory.pathname) {
      const pathname = history.entries[history.length - 2].pathname;
      for (let i = 0; i < history.length; i++) {
        if (history.index > 1) {
          history.goBack();
        }
      }
      history.push(pathname);
    }
  } catch (err) {
    // err
  }
}

if (!window.location) {
  window.location = {
    href: '',
    hash: '',
    pathname: '',
    hostname: '',
    port: '',
  };
}

try {
  //url Change listener
  if (
    'onhashchange' in window &&
    (typeof document['documentMode'] === 'undefined' ||
      document['documentMode'] === 8)
  ) {
    // Browser support onhashchange event
    window.onhashchange = hashChange;
  } else {
    let oldHash = window.location.hash;

    const isHashChanged = () => {
      return oldHash === window.location.hash;
    };

    // If it is not supported, use the timer detection method
    setInterval(function() {
      // The function that detects the hash value or whether one of the segments changes.
      // In the lower version of the iE browser, the pointer taken through window.location.hash
      // is different from other browsers.
      var ischanged = isHashChanged();
      if (ischanged) {
        // The operation function corresponding to the new hash execution
        hashChange();
      }
    }, 350);
  }
} catch (err) {}

let goToHome = function() {
  const pathname = history.entries[1].pathname;
  for (let i = 0; i < history.length; i++) {
    if (history.index > 1) {
      history.goBack();
    }
  }
  history.push(pathname);
};
export {
  history,
  Route,
  Router,
  Prompt,
  Redirect,
  Switch,
  nowHistory,
  withRouter,
  hashChange,
  historyAddListen,
  historyRemoveListen,
  position,
  goToHome,
};
