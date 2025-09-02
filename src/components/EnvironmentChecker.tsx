import { useState } from 'react';
import { Button } from './ui/button';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function EnvironmentChecker() {
  const [isVisible, setIsVisible] = useState(false);
  const [envStatus, setEnvStatus] = useState<Record<string, string>>({});

  const checkEnvironment = async () => {
    try {
      const response = await fetch('/api/health');
      if (response.ok) {
        const data = await response.json();
        setEnvStatus(data.environment || {});
      } else {
        setEnvStatus({ error: 'Failed to fetch environment status' });
      }
    } catch (error) {
      setEnvStatus({ error: 'API endpoint not available' });
    }
  };

  if (import.meta.env.DEV) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => {
            if (!isVisible) {
              checkEnvironment();
            }
            setIsVisible(!isVisible);
          }}
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm"
        >
          {isVisible ? 'Hide' : 'Check'} Config
        </Button>
        
        {isVisible && (
          <div className="absolute bottom-12 right-0 w-80 bg-white rounded-lg shadow-lg border p-4 space-y-2">
            <h3 className="font-semibold text-sm text-gray-900 mb-2">Environment Status</h3>
            {Object.entries(envStatus).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between text-xs">
                <span className="text-gray-600">{key}:</span>
                <div className="flex items-center gap-1">
                  {value === 'configured' ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : value === 'not set' ? (
                    <XCircle className="w-3 h-3 text-red-500" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-yellow-500" />
                  )}
                  <span className={value === 'configured' ? 'text-green-600' : value === 'not set' ? 'text-red-600' : 'text-yellow-600'}>
                    {value}
                  </span>
                </div>
              </div>
            ))}
            {Object.keys(envStatus).length === 0 && (
              <p className="text-xs text-gray-500">Click "Check Config" to see status</p>
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
}
