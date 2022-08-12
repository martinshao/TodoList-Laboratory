const fakeNode = document.createElement('react');

export function invokeGuardedCallbackDev(name, func, context) {
  const evt = document.createEvent('Event');
  let didCall = false;
  let didError = true;
  const windowEvent = window.event;
  const windowEventDescriptor = Object.getOwnPropertyDescriptor(
    window,
    'event',
  );

  const evtType = `react-${name ? name : 'invokeguardedcallback'}`;

  function restoreAfterDispatch() {
    fakeNode.removeEventListener(evtType, callCallback, false);

    if (
      typeof window.event !== 'undefined' &&
      window.hasOwnProperty('event')
    ) {
      window.event = windowEvent;
    }
  }

  const funcArgs = Array.prototype.slice.call(arguments, 3);
  function callCallback() {
    didCall = true;
    restoreAfterDispatch();
    func.apply(context, funcArgs);
    didError = false;
  }

  let error;
  // Use this to track whether the error event is ever called.
  let didSetError = false;
  let isCrossOriginError = false;

  function handleWindowError(event) {
    error = event.error;
    didSetError = true;
    if (error === null && event.colno === 0 && event.lineno === 0) {
      isCrossOriginError = true;
    }
    if (event.defaultPrevented) {
      // Some other error handler has prevented default.
      // Browsers silence the error report if this happens.
      // We'll remember this to later decide whether to log it or not.
      if (error != null && typeof error === 'object') {
        try {
          error._suppressLogging = true;
        } catch (inner) {
          // Ignore.
        }
      }
    }
  }

  // Attach our event handlers
  window.addEventListener('error', handleWindowError);
  fakeNode.addEventListener(evtType, callCallback, false);

  // Synchronously dispatch our fake event. If the user-provided function
  // errors, it will trigger our global error handler.
  evt.initEvent(evtType, false, false);
  fakeNode.dispatchEvent(evt);

  if (windowEventDescriptor) {
    Object.defineProperty(window, 'event', windowEventDescriptor);
  }
}
const fakeNode = document.createElement('react');
const evt = document.createEvent('Event');
const eventType = 'martin-click'
function callCalback() {
  console.info('hello Martin')
}
fakeNode.addEventListener(eventType, callCalback, false);
evt.initEvent(eventType, false, false);
fakeNode.dispatchEvent(evt)