import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

import { initPerformanceTimingMonitor } from "./monitoring/performanceTiming";

initPerformanceTimingMonitor({
  appId: "cra-performance-demo",
  release: "local-dev-1.0.0",

  // 本地没有后端时可以先不传 endpoint，只看 console 输出
  endpoint: process.env.REACT_APP_MONITOR_ENDPOINT,

  // MVP 阶段全量采集
  sampleRate: 1,

  // 本地调试打开
  debug: process.env.NODE_ENV !== "production",
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
