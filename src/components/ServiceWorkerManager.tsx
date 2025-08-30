import { useEffect, useState } from 'react';
import { Wifi, WifiOff, Download, X } from 'lucide-react';

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isOnline: boolean;
  updateAvailable: boolean;
  installPrompt: any;
}

export default function ServiceWorkerManager() {
  const [swState, setSwState] = useState<ServiceWorkerState>({
    isSupported: false,
    isRegistered: false,
    isOnline: true,
    updateAvailable: false,
    installPrompt: null
  });

  const [showOfflineNotice, setShowOfflineNotice] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  useEffect(() => {
    // Check if service workers are supported
    const isSupported = 'serviceWorker' in navigator;
    setSwState(prev => ({ ...prev, isSupported }));

    if (!isSupported) {
      console.log('Service workers are not supported in this browser');
      return;
    }

    // Register service worker
    registerServiceWorker();

    // Listen for online/offline events
    const handleOnline = () => {
      setSwState(prev => ({ ...prev, isOnline: true }));
      setShowOfflineNotice(false);
    };

    const handleOffline = () => {
      setSwState(prev => ({ ...prev, isOnline: false }));
      setShowOfflineNotice(true);
    };

    // Listen for PWA install prompt
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault();
      setSwState(prev => ({ ...prev, installPrompt: e }));
      setShowInstallPrompt(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    // Set initial online state
    setSwState(prev => ({ ...prev, isOnline: navigator.onLine }));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      setSwState(prev => ({ ...prev, isRegistered: true }));

      // Check for service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setSwState(prev => ({ ...prev, updateAvailable: true }));
              setShowUpdatePrompt(true);
            }
          });
        }
      });

      console.log('[SW] Service worker registered successfully');
    } catch (error) {
      console.error('[SW] Service worker registration failed:', error);
    }
  };

  const handleInstallApp = async () => {
    if (swState.installPrompt) {
      swState.installPrompt.prompt();
      const result = await swState.installPrompt.userChoice;
      
      if (result.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      
      setSwState(prev => ({ ...prev, installPrompt: null }));
      setShowInstallPrompt(false);
    }
  };

  const handleUpdateApp = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ action: 'SKIP_WAITING' });
    }
    window.location.reload();
  };

  return (
    <>
      {/* Offline Notice */}
      {showOfflineNotice && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white py-2 px-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm font-medium">
                You're currently offline. Some features may be limited.
              </span>
            </div>
            <button
              onClick={() => setShowOfflineNotice(false)}
              className="p-1 hover:bg-amber-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Install App Prompt */}
      {showInstallPrompt && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
          <div className="glass-strong rounded-xl p-4 border border-white/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Install A Place Called Home
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Install our app for quick access and offline features.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleInstallApp}
                    className="glass-button text-xs py-2 px-3 rounded-lg"
                  >
                    Install
                  </button>
                  <button
                    onClick={() => setShowInstallPrompt(false)}
                    className="text-xs py-2 px-3 rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    Not now
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Available Prompt */}
      {showUpdatePrompt && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
          <div className="glass-strong rounded-xl p-4 border border-white/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Update Available
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  A new version is available with improvements and bug fixes.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateApp}
                    className="glass-button text-xs py-2 px-3 rounded-lg"
                  >
                    Update Now
                  </button>
                  <button
                    onClick={() => setShowUpdatePrompt(false)}
                    className="text-xs py-2 px-3 rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    Later
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowUpdatePrompt(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Connection Status Indicator (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-20 right-4 z-50">
          <div className={`glass p-2 rounded-lg ${swState.isOnline ? 'text-green-600' : 'text-red-600'}`}>
            {swState.isOnline ? (
              <Wifi className="w-4 h-4" />
            ) : (
              <WifiOff className="w-4 h-4" />
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Hook for checking if app is installed
export function useIsInstalled() {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is running in standalone mode (installed)
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppiOS = (window.navigator as any).standalone === true;
      setIsInstalled(isStandalone || isInWebAppiOS);
    };

    checkInstalled();
    
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkInstalled);
    
    return () => {
      mediaQuery.removeEventListener('change', checkInstalled);
    };
  }, []);

  return isInstalled;
}

// Hook for handling offline form submissions
export function useOfflineSync() {
  const submitOffline = async (formData: any, syncTag: string) => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        // Store form data in IndexedDB or localStorage
        const offlineData = JSON.parse(localStorage.getItem('offlineSubmissions') || '[]');
        offlineData.push({
          id: Date.now(),
          data: formData,
          syncTag,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('offlineSubmissions', JSON.stringify(offlineData));

        // Register background sync
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register(syncTag);
        
        return { success: true, offline: true };
      } catch (error) {
        console.error('Offline sync registration failed:', error);
        return { success: false, error };
      }
    }
    
    return { success: false, error: 'Offline sync not supported' };
  };

  return { submitOffline };
}