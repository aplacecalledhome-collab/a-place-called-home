import { useState, useEffect, useCallback } from 'react';
import { 
  Monitor, 
  Zap, 
  Database, 
  Wifi, 
  Globe, 
  Shield, 
  Smartphone,
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  BarChart3,
  Clock,
  HardDrive
} from 'lucide-react';
import { usePerformanceData } from './PerformanceMonitor';
import { useMemoryMonitor, useViewport } from '../hooks/usePerformance';

interface TechnicalMetrics {
  performance: {
    lcp: number | null;
    fid: number | null;
    cls: number | null;
    fcp: number | null;
    ttfb: number | null;
  };
  network: {
    effectiveType: string;
    downlink: number;
    rtt: number;
    saveData: boolean;
  };
  device: {
    memory: number;
    cores: number;
    platform: string;
    userAgent: string;
  };
  browser: {
    name: string;
    version: string;
    engine: string;
    features: string[];
  };
  pwa: {
    isInstalled: boolean;
    hasServiceWorker: boolean;
    isOnline: boolean;
    hasPushNotifications: boolean;
  };
}

export default function TechnicalDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState<TechnicalMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const performanceData = usePerformanceData();
  const memoryInfo = useMemoryMonitor();
  const viewport = useViewport();

  const collectMetrics = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Performance metrics
      const performance = {
        lcp: performanceData.lcp || null,
        fid: null, // Will be filled by performance observer
        cls: null, // Will be filled by performance observer
        fcp: performanceData.fcp || null,
        ttfb: performanceData.ttfb || null
      };

      // Network information
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const network = {
        effectiveType: connection?.effectiveType || 'unknown',
        downlink: connection?.downlink || 0,
        rtt: connection?.rtt || 0,
        saveData: connection?.saveData || false
      };

      // Device information
      const device = {
        memory: (navigator as any).deviceMemory || 0,
        cores: navigator.hardwareConcurrency || 0,
        platform: navigator.platform,
        userAgent: navigator.userAgent
      };

      // Browser detection
      const getBrowserInfo = () => {
        const ua = navigator.userAgent;
        let name = 'Unknown';
        let version = 'Unknown';
        let engine = 'Unknown';

        if (ua.includes('Chrome')) {
          name = 'Chrome';
          version = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
          engine = 'Blink';
        } else if (ua.includes('Firefox')) {
          name = 'Firefox';
          version = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
          engine = 'Gecko';
        } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
          name = 'Safari';
          version = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
          engine = 'WebKit';
        } else if (ua.includes('Edge')) {
          name = 'Edge';
          version = ua.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
          engine = 'EdgeHTML';
        }

        return { name, version, engine };
      };

      const browser = {
        ...getBrowserInfo(),
        features: [
          'serviceWorker' in navigator ? 'Service Worker' : null,
          'IntersectionObserver' in window ? 'Intersection Observer' : null,
          'requestIdleCallback' in window ? 'Idle Callback' : null,
          'PerformanceObserver' in window ? 'Performance Observer' : null,
          'WebAssembly' in window ? 'WebAssembly' : null,
          'CSS' in window && 'supports' in window.CSS ? 'CSS Feature Queries' : null,
          'BroadcastChannel' in window ? 'Broadcast Channel' : null
        ].filter(Boolean) as string[]
      };

      // PWA status
      const pwa = {
        isInstalled: window.matchMedia('(display-mode: standalone)').matches,
        hasServiceWorker: 'serviceWorker' in navigator,
        isOnline: navigator.onLine,
        hasPushNotifications: 'PushManager' in window && 'Notification' in window
      };

      setMetrics({
        performance,
        network,
        device,
        browser,
        pwa
      });
    } catch (error) {
      console.error('Error collecting metrics:', error);
    } finally {
      setIsLoading(false);
    }
  }, [performanceData]);

  useEffect(() => {
    if (isOpen) {
      collectMetrics();
    }
  }, [isOpen, collectMetrics]);

  const getScoreColor = (score: number, thresholds = { good: 75, warning: 50 }) => {
    if (score >= thresholds.good) return 'text-green-600';
    if (score >= thresholds.warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number, thresholds = { good: 75, warning: 50 }) => {
    if (score >= thresholds.good) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (score >= thresholds.warning) return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    return <XCircle className="w-4 h-4 text-red-600" />;
  };

  const calculatePerformanceScore = () => {
    if (!metrics?.performance) return 0;
    
    let score = 100;
    const { lcp, fcp, ttfb } = metrics.performance;
    
    // LCP scoring
    if (lcp) {
      if (lcp > 4000) score -= 30;
      else if (lcp > 2500) score -= 15;
    }
    
    // FCP scoring
    if (fcp) {
      if (fcp > 3000) score -= 20;
      else if (fcp > 1800) score -= 10;
    }
    
    // TTFB scoring
    if (ttfb) {
      if (ttfb > 1800) score -= 20;
      else if (ttfb > 800) score -= 10;
    }
    
    return Math.max(0, score);
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Dashboard Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-16 left-4 z-50 glass p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        title="Technical Dashboard"
      >
        <Monitor className="w-5 h-5 text-purple-600" />
      </button>

      {/* Dashboard Panel */}
      {isOpen && (
        <div className="fixed inset-4 z-50 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Technical Dashboard</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={collectMetrics}
                  disabled={isLoading}
                  className="glass-button text-sm py-2 px-4 rounded-lg"
                >
                  {isLoading ? 'Refreshing...' : 'Refresh'}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Collecting metrics...</p>
                  </div>
                </div>
              ) : metrics ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Performance Card */}
                  <div className="glass p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-yellow-600" />
                      <h3 className="font-semibold">Performance</h3>
                      {getScoreIcon(calculatePerformanceScore())}
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>LCP:</span>
                        <span className={metrics.performance.lcp ? getScoreColor(metrics.performance.lcp > 2500 ? 25 : 100) : 'text-gray-400'}>
                          {metrics.performance.lcp ? `${metrics.performance.lcp.toFixed(0)}ms` : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>FCP:</span>
                        <span className={metrics.performance.fcp ? getScoreColor(metrics.performance.fcp > 1800 ? 25 : 100) : 'text-gray-400'}>
                          {metrics.performance.fcp ? `${metrics.performance.fcp.toFixed(0)}ms` : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>TTFB:</span>
                        <span className={metrics.performance.ttfb ? getScoreColor(metrics.performance.ttfb > 800 ? 25 : 100) : 'text-gray-400'}>
                          {metrics.performance.ttfb ? `${metrics.performance.ttfb.toFixed(0)}ms` : 'N/A'}
                        </span>
                      </div>
                      <div className="pt-2 border-t">
                        <div className={`text-2xl font-bold ${getScoreColor(calculatePerformanceScore())}`}>
                          {calculatePerformanceScore()}/100
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Network Card */}
                  <div className="glass p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Wifi className="w-6 h-6 text-blue-600" />
                      <h3 className="font-semibold">Network</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Type:</span>
                        <span className="capitalize">{metrics.network.effectiveType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Downlink:</span>
                        <span>{metrics.network.downlink} Mbps</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>RTT:</span>
                        <span>{metrics.network.rtt}ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Data Saver:</span>
                        <span>{metrics.network.saveData ? 'On' : 'Off'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Device Card */}
                  <div className="glass p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Smartphone className="w-6 h-6 text-green-600" />
                      <h3 className="font-semibold">Device</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Memory:</span>
                        <span>{metrics.device.memory || 'Unknown'} GB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>CPU Cores:</span>
                        <span>{metrics.device.cores}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Platform:</span>
                        <span className="truncate max-w-24">{metrics.device.platform}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Viewport:</span>
                        <span>{viewport.width}×{viewport.height}</span>
                      </div>
                    </div>
                  </div>

                  {/* Browser Card */}
                  <div className="glass p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="w-6 h-6 text-purple-600" />
                      <h3 className="font-semibold">Browser</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Name:</span>
                        <span>{metrics.browser.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Version:</span>
                        <span>{metrics.browser.version}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Engine:</span>
                        <span>{metrics.browser.engine}</span>
                      </div>
                      <div className="text-sm">
                        <span className="block mb-1">Features:</span>
                        <div className="text-xs text-gray-600 space-y-1">
                          {metrics.browser.features.slice(0, 4).map(feature => (
                            <div key={feature} className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PWA Card */}
                  <div className="glass p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-indigo-600" />
                      <h3 className="font-semibold">PWA Status</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span>Installed:</span>
                        {metrics.pwa.isInstalled ? 
                          <CheckCircle className="w-4 h-4 text-green-600" /> : 
                          <XCircle className="w-4 h-4 text-gray-400" />
                        }
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Service Worker:</span>
                        {metrics.pwa.hasServiceWorker ? 
                          <CheckCircle className="w-4 h-4 text-green-600" /> : 
                          <XCircle className="w-4 h-4 text-gray-400" />
                        }
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Online:</span>
                        {metrics.pwa.isOnline ? 
                          <CheckCircle className="w-4 h-4 text-green-600" /> : 
                          <XCircle className="w-4 h-4 text-red-600" />
                        }
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Notifications:</span>
                        {metrics.pwa.hasPushNotifications ? 
                          <CheckCircle className="w-4 h-4 text-green-600" /> : 
                          <XCircle className="w-4 h-4 text-gray-400" />
                        }
                      </div>
                    </div>
                  </div>

                  {/* Memory Card */}
                  {memoryInfo && (
                    <div className="glass p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <HardDrive className="w-6 h-6 text-orange-600" />
                        <h3 className="font-semibold">Memory Usage</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Used:</span>
                          <span>{(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(1)} MB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total:</span>
                          <span>{(memoryInfo.totalJSHeapSize / 1024 / 1024).toFixed(1)} MB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Limit:</span>
                          <span>{(memoryInfo.jsHeapSizeLimit / 1024 / 1024).toFixed(1)} MB</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full" 
                            style={{ 
                              width: `${(memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Click "Refresh" to collect technical metrics
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}