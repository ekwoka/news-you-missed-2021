import { useEffect, useState } from 'preact/hooks';

function GlobalState(initialValue) {
  this.value = initialValue; // Actual value of a global state
  this.subscribers = []; // List of subscribers
  this.getValue = function () {
    return this.value;
  };
  this.setValue = function (newState) {
    if (this.getValue() === newState) {
      return;
    }
    this.value = newState;
    this.subscribers.forEach((subscriber) => {
      subscriber(this.value);
    });
  };
  this.subscribe = function (itemToSubscribe) {
    if (this.subscribers.indexOf(itemToSubscribe) > -1) {
      // Already subsribed
      return;
    }
    this.subscribers.push(itemToSubscribe);
  };
  this.unsubscribe = function (itemToUnsubscribe) {
    this.subscribers = this.subscribers.filter((subscriber) => {
      return subscriber !== itemToUnsubscribe;
    });
  };
}

function Store() {
  this.value = {};

  this.init = function (obj) {
    for (let i in obj) {
      this.setState(i, obj[i]);
    }
  };

  this.getState = function (key, defaultValue) {
    if (this.value[key] === undefined) {
      this.setState(key, defaultValue);
    }
    return this.value[key];
  };

  this.setState = function (key, value) {
    this.value[key] = new GlobalState(value);
  };
}

function useGlobalState(key, defaultValue) {
  if (typeof defaultValue === 'undefined') {
    defaultValue = null;
  }

  const [, setState] = useState();
  let globalState = store.getState(key, defaultValue);

  let currentState = globalState.getValue();

  function reRender() {
    setState({});
  }

  useEffect(() => {
    globalState.subscribe(reRender);
    return function () {
      globalState.unsubscribe(reRender);
    };
  });

  return [
    currentState,
    function (v) {
      globalState.setValue(v);
    },
  ];
}

const store = new Store();

export { useGlobalState, store };
