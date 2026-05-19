// src/monitoring/performanceTiming.ts

type PerformanceMonitorConfig = {
  appId?: string;
  release?: string;
  endpoint?: string;
  sampleRate?: number;
  debug?: boolean;
};

type TimingSource = "navigation_timing_l2" | "performance_timing_legacy";

type NormalizedNavigationTiming = {
  source: TimingSource;
  url: string;
  navigationType?: string;
  startTime: number;

  raw: Record<string, number>;

  size?: {
    transferSize?: number;
    encodedBodySize?: number;
    decodedBodySize?: number;
  };

  meta?: {
    nextHopProtocol?: string;
    redirectCount?: number;
  };
};

type DerivedMetrics = {
  redirect: number;
  dns: number;
  tcp: number;
  tls: number;
  request: number;
  ttfb: number;
  responseDownload: number;
  domParse: number;
  domReady: number;
  domContentLoaded: number;
  loadEvent: number;
  totalLoad: number;
};

type PaintMetrics = {
  fp?: number;
  fcp?: number;
};

type ResourceSummary = {
  total: number;
  byType: Record<
    string,
    {
      count: number;
      totalDuration: number;
      totalTransferSize: number;
      maxDuration: number;
    }
  >;
  slowest: Array<{
    name: string;
    initiatorType: string;
    duration: number;
    transferSize?: number;
  }>;
};

type PerformancePayload = {
  type: "page_performance";
  appId?: string;
  release?: string;
  url: string;
  title: string;
  userAgent: string;
  language: string;
  timestamp: number;

  navigation: NormalizedNavigationTiming;
  metrics: DerivedMetrics;
  paint: PaintMetrics;
  resources: ResourceSummary;
};

declare global {
  interface Window {
    __PERF_MONITOR_INSTALLED__?: boolean;
  }
}

const DEFAULT_CONFIG: Required<Pick<PerformanceMonitorConfig, "sampleRate" | "debug">> = {
  sampleRate: 1,
  debug: true,
};

export function initPerformanceTimingMonitor(config: PerformanceMonitorConfig = {}) {
  if (typeof window === "undefined") return;

  // 防止重复初始化，React StrictMode / HMR 场景下尤其重要
  if (window.__PERF_MONITOR_INSTALLED__) return;
  window.__PERF_MONITOR_INSTALLED__ = true;

  const mergedConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  if (!shouldSample(mergedConfig.sampleRate)) {
    return;
  }

  collectAfterPageLoad(() => {
    try {
      const payload = collectPerformancePayload(mergedConfig);

      if (!payload) {
        if (mergedConfig.debug) {
          console.warn("[perf-monitor] no navigation timing data collected");
        }
        return;
      }

      if (mergedConfig.debug) {
        printDebugInfo(payload);
      }

      reportPerformancePayload(payload, mergedConfig);
    } catch (error) {
      // 监控 SDK 不能影响主业务
      if (mergedConfig.debug) {
        console.warn("[perf-monitor] collect failed:", error);
      }
    }
  });
}

function collectAfterPageLoad(callback: () => void) {
  const run = () => {
    // 等浏览器把 loadEventEnd 等字段写完
    window.setTimeout(callback, 0);
  };

  if (document.readyState === "complete") {
    run();
  } else {
    window.addEventListener("load", run, { once: true });
  }
}

function collectPerformancePayload(config: PerformanceMonitorConfig): PerformancePayload | null {
  const navigation = getNormalizedNavigationTiming();

  if (!navigation) {
    return null;
  }

  const metrics = deriveNavigationMetrics(navigation);
  const paint = collectPaintMetrics();
  const resources = collectResourceSummary();

  return {
    type: "page_performance",
    appId: config.appId,
    release: config.release,
    url: window.location.href,
    title: document.title,
    userAgent: navigator.userAgent,
    language: navigator.language,
    timestamp: Date.now(),

    navigation,
    metrics,
    paint,
    resources,
  };
}

function getNormalizedNavigationTiming(): NormalizedNavigationTiming | null {
  const navEntry = performance.getEntriesByType?.("navigation")?.[0] as
    | PerformanceNavigationTiming
    | undefined;

  if (navEntry) {
    return normalizeNavigationTimingL2(navEntry);
  }

  if (performance.timing) {
    return normalizeLegacyPerformanceTiming(performance.timing);
  }

  return null;
}

function normalizeNavigationTimingL2(
  nav: PerformanceNavigationTiming
): NormalizedNavigationTiming {
  return {
    source: "navigation_timing_l2",
    url: nav.name || window.location.href,
    navigationType: nav.type,
    startTime: nav.startTime,

    raw: {
      startTime: safeNumber(nav.startTime),
      redirectStart: safeNumber(nav.redirectStart),
      redirectEnd: safeNumber(nav.redirectEnd),
      fetchStart: safeNumber(nav.fetchStart),
      domainLookupStart: safeNumber(nav.domainLookupStart),
      domainLookupEnd: safeNumber(nav.domainLookupEnd),
      connectStart: safeNumber(nav.connectStart),
      secureConnectionStart: safeNumber(nav.secureConnectionStart),
      connectEnd: safeNumber(nav.connectEnd),
      requestStart: safeNumber(nav.requestStart),
      responseStart: safeNumber(nav.responseStart),
      responseEnd: safeNumber(nav.responseEnd),
      domInteractive: safeNumber(nav.domInteractive),
      domContentLoadedEventStart: safeNumber(nav.domContentLoadedEventStart),
      domContentLoadedEventEnd: safeNumber(nav.domContentLoadedEventEnd),
      domComplete: safeNumber(nav.domComplete),
      loadEventStart: safeNumber(nav.loadEventStart),
      loadEventEnd: safeNumber(nav.loadEventEnd),
      duration: safeNumber(nav.duration),
    },

    size: {
      transferSize: safeNumber(nav.transferSize),
      encodedBodySize: safeNumber(nav.encodedBodySize),
      decodedBodySize: safeNumber(nav.decodedBodySize),
    },

    meta: {
      nextHopProtocol: nav.nextHopProtocol,
      redirectCount: safeNumber(nav.redirectCount),
    },
  };
}

function normalizeLegacyPerformanceTiming(
  timing: PerformanceTiming
): NormalizedNavigationTiming {
  const navigationStart = timing.navigationStart || 0;

  const toRelative = (value: number) => {
    if (!value || !navigationStart) return 0;
    return Math.max(value - navigationStart, 0);
  };

  return {
    source: "performance_timing_legacy",
    url: window.location.href,
    navigationType: getLegacyNavigationType(),
    startTime: 0,

    raw: {
      startTime: 0,
      redirectStart: toRelative(timing.redirectStart),
      redirectEnd: toRelative(timing.redirectEnd),
      fetchStart: toRelative(timing.fetchStart),
      domainLookupStart: toRelative(timing.domainLookupStart),
      domainLookupEnd: toRelative(timing.domainLookupEnd),
      connectStart: toRelative(timing.connectStart),
      secureConnectionStart: toRelative(timing.secureConnectionStart),
      connectEnd: toRelative(timing.connectEnd),
      requestStart: toRelative(timing.requestStart),
      responseStart: toRelative(timing.responseStart),
      responseEnd: toRelative(timing.responseEnd),
      domInteractive: toRelative(timing.domInteractive),
      domContentLoadedEventStart: toRelative(timing.domContentLoadedEventStart),
      domContentLoadedEventEnd: toRelative(timing.domContentLoadedEventEnd),
      domComplete: toRelative(timing.domComplete),
      loadEventStart: toRelative(timing.loadEventStart),
      loadEventEnd: toRelative(timing.loadEventEnd),
      duration: toRelative(timing.loadEventEnd),
    },

    size: {
      transferSize: 0,
      encodedBodySize: 0,
      decodedBodySize: 0,
    },
  };
}

function deriveNavigationMetrics(navigation: NormalizedNavigationTiming): DerivedMetrics {
  const t = navigation.raw;

  const metrics: DerivedMetrics = {
    redirect: diff(t.redirectEnd, t.redirectStart),

    dns: diff(t.domainLookupEnd, t.domainLookupStart),

    tcp: diff(t.connectEnd, t.connectStart),

    tls:
      t.secureConnectionStart > 0
        ? diff(t.connectEnd, t.secureConnectionStart)
        : 0,

    request: diff(t.responseStart, t.requestStart),

    // 这里采用 requestStart -> responseStart 作为更接近服务端首包耗时的口径
    ttfb: diff(t.responseStart, t.requestStart),

    responseDownload: diff(t.responseEnd, t.responseStart),

    domParse: diff(t.domInteractive, t.responseEnd),

    domReady: diff(t.domContentLoadedEventEnd, t.fetchStart),

    domContentLoaded: diff(
      t.domContentLoadedEventEnd,
      t.domContentLoadedEventStart
    ),

    loadEvent: diff(t.loadEventEnd, t.loadEventStart),

    totalLoad: t.duration || diff(t.loadEventEnd, t.fetchStart),
  };

  return sanitizeMetrics(metrics);
}

function collectPaintMetrics(): PaintMetrics {
  const result: PaintMetrics = {};

  const paintEntries = performance.getEntriesByType?.("paint") || [];

  for (const entry of paintEntries) {
    if (entry.name === "first-paint") {
      result.fp = round(entry.startTime);
    }

    if (entry.name === "first-contentful-paint") {
      result.fcp = round(entry.startTime);
    }
  }

  return result;
}

function collectResourceSummary(): ResourceSummary {
  const entries = performance.getEntriesByType?.("resource") as
    | PerformanceResourceTiming[]
    | undefined;

  const summary: ResourceSummary = {
    total: 0,
    byType: {},
    slowest: [],
  };

  if (!entries?.length) {
    return summary;
  }

  summary.total = entries.length;

  for (const entry of entries) {
    const type = entry.initiatorType || "unknown";

    if (!summary.byType[type]) {
      summary.byType[type] = {
        count: 0,
        totalDuration: 0,
        totalTransferSize: 0,
        maxDuration: 0,
      };
    }

    const group = summary.byType[type];

    group.count += 1;
    group.totalDuration += entry.duration || 0;
    group.totalTransferSize += entry.transferSize || 0;
    group.maxDuration = Math.max(group.maxDuration, entry.duration || 0);

    summary.slowest.push({
      name: entry.name,
      initiatorType: type,
      duration: round(entry.duration || 0),
      transferSize: entry.transferSize,
    });
  }

  for (const type of Object.keys(summary.byType)) {
    const group = summary.byType[type];

    group.totalDuration = round(group.totalDuration);
    group.totalTransferSize = round(group.totalTransferSize);
    group.maxDuration = round(group.maxDuration);
  }

  summary.slowest = summary.slowest
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 10);

  return summary;
}

function reportPerformancePayload(
  payload: PerformancePayload,
  config: PerformanceMonitorConfig
) {
  const endpoint = config.endpoint;

  if (!endpoint) {
    return;
  }

  const body = JSON.stringify(payload);

  // 页面卸载时更适合 beacon；普通场景也可以用
  if (navigator.sendBeacon) {
    const blob = new Blob([body], {
      type: "application/json",
    });

    const success = navigator.sendBeacon(endpoint, blob);

    if (success) {
      return;
    }
  }

  // fallback
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  }).catch(() => {
    // MVP 阶段静默失败
  });
}

function printDebugInfo(payload: PerformancePayload) {
  console.group("[perf-monitor] page performance payload");
  console.log("payload:", payload);

  console.group("navigation metrics");
  console.table(payload.metrics);
  console.groupEnd();

  console.group("paint metrics");
  console.table(payload.paint);
  console.groupEnd();

  console.group("resource summary");
  console.table(payload.resources.byType);
  console.log("slowest resources:", payload.resources.slowest);
  console.groupEnd();

  console.groupEnd();
}

function diff(end?: number, start?: number) {
  if (!end || !start) return 0;

  const value = end - start;

  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }

  return round(value);
}

function safeNumber(value: unknown) {
  const n = Number(value);

  if (!Number.isFinite(n) || n < 0) {
    return 0;
  }

  return round(n);
}

function sanitizeMetrics<T extends Record<string, number>>(metrics: T): T {
  const MAX_REASONABLE_VALUE = 10 * 60 * 1000;

  for (const key of Object.keys(metrics)) {
    const value = metrics[key];

    if (!Number.isFinite(value) || value < 0 || value > MAX_REASONABLE_VALUE) {
      metrics[key as keyof T] = 0 as T[keyof T];
    }
  }

  return metrics;
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function shouldSample(sampleRate: number) {
  if (sampleRate >= 1) return true;
  if (sampleRate <= 0) return false;

  return Math.random() < sampleRate;
}

function getLegacyNavigationType() {
  const nav = performance.navigation;

  if (!nav) return "unknown";

  switch (nav.type) {
    case 0:
      return "navigate";
    case 1:
      return "reload";
    case 2:
      return "back_forward";
    case 255:
      return "reserved";
    default:
      return "unknown";
  }
}