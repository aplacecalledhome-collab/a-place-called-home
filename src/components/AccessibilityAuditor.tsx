import { useEffect, useState, useCallback } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Eye, Keyboard, Volume2 } from 'lucide-react';

interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info';
  category: 'color' | 'keyboard' | 'screen-reader' | 'structure' | 'interactive';
  element: string;
  description: string;
  recommendation: string;
  wcagLevel: 'A' | 'AA' | 'AAA';
}

interface AccessibilityReport {
  score: number;
  issues: AccessibilityIssue[];
  passedChecks: string[];
  totalChecks: number;
}

export default function AccessibilityAuditor() {
  const [report, setReport] = useState<AccessibilityReport | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const auditAccessibility = useCallback(async () => {
    setIsAuditing(true);
    const issues: AccessibilityIssue[] = [];
    const passedChecks: string[] = [];
    let totalChecks = 0;

    // Check 1: Images without alt text
    totalChecks++;
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    if (imagesWithoutAlt.length > 0) {
      issues.push({
        type: 'error',
        category: 'screen-reader',
        element: `${imagesWithoutAlt.length} image(s)`,
        description: 'Images without alt text are not accessible to screen readers',
        recommendation: 'Add descriptive alt attributes to all images',
        wcagLevel: 'A'
      });
    } else {
      passedChecks.push('All images have alt text');
    }

    // Check 2: Links without descriptive text
    totalChecks++;
    const poorLinks = document.querySelectorAll('a[href]');
    const badLinkTexts = ['click here', 'read more', 'here', 'more'];
    let badLinksCount = 0;
    
    poorLinks.forEach(link => {
      const text = link.textContent?.toLowerCase().trim();
      if (text && badLinkTexts.includes(text)) {
        badLinksCount++;
      }
    });

    if (badLinksCount > 0) {
      issues.push({
        type: 'warning',
        category: 'screen-reader',
        element: `${badLinksCount} link(s)`,
        description: 'Links with non-descriptive text are confusing for screen reader users',
        recommendation: 'Use descriptive link text that explains the destination or action',
        wcagLevel: 'A'
      });
    } else {
      passedChecks.push('All links have descriptive text');
    }

    // Check 3: Heading structure
    totalChecks++;
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingLevels: number[] = [];
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.substring(1));
      headingLevels.push(level);
    });

    let headingStructureValid = true;
    for (let i = 1; i < headingLevels.length; i++) {
      if (headingLevels[i] - headingLevels[i - 1] > 1) {
        headingStructureValid = false;
        break;
      }
    }

    if (!headingStructureValid || headingLevels[0] !== 1) {
      issues.push({
        type: 'error',
        category: 'structure',
        element: 'Page heading structure',
        description: 'Heading levels should be sequential and start with h1',
        recommendation: 'Ensure proper heading hierarchy (h1 → h2 → h3, etc.)',
        wcagLevel: 'A'
      });
    } else {
      passedChecks.push('Heading structure is valid');
    }

    // Check 4: Form labels
    totalChecks++;
    const inputs = document.querySelectorAll('input, select, textarea');
    let unlabeledInputs = 0;

    inputs.forEach(input => {
      const id = input.getAttribute('id');
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');
      const label = id ? document.querySelector(`label[for="${id}"]`) : null;

      if (!label && !ariaLabel && !ariaLabelledBy) {
        unlabeledInputs++;
      }
    });

    if (unlabeledInputs > 0) {
      issues.push({
        type: 'error',
        category: 'screen-reader',
        element: `${unlabeledInputs} form input(s)`,
        description: 'Form inputs without labels are not accessible to screen readers',
        recommendation: 'Associate labels with form inputs using label[for] or aria-label',
        wcagLevel: 'A'
      });
    } else {
      passedChecks.push('All form inputs have labels');
    }

    // Check 5: Color contrast (simplified check)
    totalChecks++;
    const elements = document.querySelectorAll('*');
    let lowContrastElements = 0;

    // This is a simplified check - in a real implementation, you'd use a proper color contrast library
    elements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const backgroundColor = styles.backgroundColor;
      const color = styles.color;
      
      // Simple check for white text on white background (common mistake)
      if (backgroundColor === 'rgb(255, 255, 255)' && color === 'rgb(255, 255, 255)') {
        lowContrastElements++;
      }
    });

    if (lowContrastElements > 0) {
      issues.push({
        type: 'warning',
        category: 'color',
        element: `${lowContrastElements} element(s)`,
        description: 'Some elements may have insufficient color contrast',
        recommendation: 'Ensure color contrast ratio meets WCAG AA standards (4.5:1 for normal text)',
        wcagLevel: 'AA'
      });
    } else {
      passedChecks.push('No obvious color contrast issues detected');
    }

    // Check 6: Focus management
    totalChecks++;
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    let nonFocusableInteractive = 0;

    focusableElements.forEach(element => {
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex === '-1' && element.tagName !== 'DIV') {
        nonFocusableInteractive++;
      }
    });

    if (nonFocusableInteractive > 0) {
      issues.push({
        type: 'warning',
        category: 'keyboard',
        element: `${nonFocusableInteractive} element(s)`,
        description: 'Interactive elements should be keyboard accessible',
        recommendation: 'Ensure all interactive elements can receive focus',
        wcagLevel: 'A'
      });
    } else {
      passedChecks.push('Interactive elements are keyboard accessible');
    }

    // Check 7: ARIA landmarks
    totalChecks++;
    const landmarks = document.querySelectorAll('[role="main"], main, [role="navigation"], nav, [role="banner"], header, [role="contentinfo"], footer');
    
    if (landmarks.length < 2) {
      issues.push({
        type: 'info',
        category: 'structure',
        element: 'Page structure',
        description: 'ARIA landmarks help screen reader users navigate',
        recommendation: 'Add semantic HTML5 elements or ARIA landmarks (main, nav, header, footer)',
        wcagLevel: 'AA'
      });
    } else {
      passedChecks.push('Page has proper landmark structure');
    }

    // Check 8: Skip links
    totalChecks++;
    const skipLink = document.querySelector('a[href="#main"], a[href*="skip"]');
    
    if (!skipLink) {
      issues.push({
        type: 'info',
        category: 'keyboard',
        element: 'Skip navigation',
        description: 'Skip links help keyboard users navigate quickly',
        recommendation: 'Add a "Skip to main content" link at the beginning of the page',
        wcagLevel: 'A'
      });
    } else {
      passedChecks.push('Skip link is present');
    }

    // Calculate score
    const errorWeight = 10;
    const warningWeight = 5;
    const infoWeight = 2;
    
    const totalDeductions = issues.reduce((sum, issue) => {
      switch (issue.type) {
        case 'error': return sum + errorWeight;
        case 'warning': return sum + warningWeight;
        case 'info': return sum + infoWeight;
        default: return sum;
      }
    }, 0);

    const maxScore = 100;
    const score = Math.max(0, maxScore - totalDeductions);

    setReport({
      score,
      issues,
      passedChecks,
      totalChecks
    });

    setIsAuditing(false);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Auto-audit on load in development
      const timer = setTimeout(auditAccessibility, 2000);
      return () => clearTimeout(timer);
    }
  }, [auditAccessibility]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Needs Improvement';
    return 'Poor';
  };

  return (
    <>
      {/* Floating Audit Button */}
      <button
        onClick={() => setShowReport(!showReport)}
        className="fixed bottom-4 left-4 z-50 glass p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        title="Accessibility Audit"
      >
        <Eye className="w-5 h-5 text-blue-600" />
        {report && (
          <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs flex items-center justify-center ${getScoreColor(report.score)} bg-white border-2 border-current`}>
            {Math.round(report.score)}
          </span>
        )}
      </button>

      {/* Audit Report Panel */}
      {showReport && (
        <div className="fixed bottom-20 left-4 z-50 w-96 max-h-96 overflow-y-auto">
          <div className="glass-strong rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Accessibility Audit</h3>
              <button
                onClick={() => setShowReport(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                ×
              </button>
            </div>

            {isAuditing ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Auditing accessibility...</p>
              </div>
            ) : report ? (
              <div className="space-y-4">
                {/* Score */}
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-3xl font-bold ${getScoreColor(report.score)}`}>
                    {report.score}/100
                  </div>
                  <div className="text-sm text-gray-600">
                    {getScoreLabel(report.score)}
                  </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{report.passedChecks.length} Passed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>{report.issues.length} Issues</span>
                  </div>
                </div>

                {/* Issues */}
                {report.issues.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Issues Found:</h4>
                    {report.issues.map((issue, index) => (
                      <div key={index} className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-start gap-2">
                          {issue.type === 'error' && <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />}
                          {issue.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />}
                          {issue.type === 'info' && <Eye className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {issue.element}
                            </p>
                            <p className="text-xs text-gray-600">
                              {issue.description}
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                              {issue.recommendation}
                            </p>
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-gray-200 rounded">
                              WCAG {issue.wcagLevel}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reaudit Button */}
                <button
                  onClick={auditAccessibility}
                  className="w-full glass-button py-2 px-4 rounded-lg text-sm"
                >
                  Run New Audit
                </button>
              </div>
            ) : (
              <button
                onClick={auditAccessibility}
                className="w-full glass-button py-3 px-4 rounded-lg"
              >
                Start Accessibility Audit
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Hook for accessibility features
export function useAccessibility() {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleHighContrast = useCallback(() => {
    setIsHighContrast(prev => {
      const newValue = !prev;
      document.documentElement.classList.toggle('high-contrast', newValue);
      return newValue;
    });
  }, []);

  const adjustFontSize = useCallback((delta: number) => {
    setFontSize(prev => {
      const newSize = Math.max(12, Math.min(24, prev + delta));
      document.documentElement.style.setProperty('--font-size', `${newSize}px`);
      return newSize;
    });
  }, []);

  return {
    isHighContrast,
    fontSize,
    reducedMotion,
    toggleHighContrast,
    adjustFontSize
  };
}