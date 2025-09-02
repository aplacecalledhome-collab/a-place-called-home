Cleanup summary and safe next steps

Removed redundant/disabled files:
- src/public/manifest.json (duplicate of public/manifest.json)
- src/public/robots.txt (duplicate of public/robots.txt)
- src/public/sitemap.xml (duplicate of public/sitemap.xml)
- src/components_backup/moved.txt
- src/hooks_backup/moved.txt
- src/hooks_disabled/placeholder.txt
- src/components_disabled/placeholder.txt
- src/utils_backup/moved.txt
- src/utils_disabled/placeholder.txt
- src/styles/globals.css (unused)

Candidates to archive (not referenced by the app):
- src/components/NavigationBasic.tsx
- src/components/NavigationSimple.tsx
- src/components/HeroSimple.tsx
- src/components/Amenities.tsx
- src/components/Locations.tsx
- src/components/SEOChecker.tsx
- src/components/SEOValidator.tsx
- src/components/TechnicalDashboard.tsx
- src/components/PerformanceMonitor.tsx
- src/components/AccessibilityAuditor.tsx
- src/components/ServiceWorkerManager.tsx

Notes
- UI primitives in src/components/ui/* are kept.
- SEO hook (src/hooks/useSEO.ts) is active via App.tsx.
- Consider adding a dead-export scanner (ts-prune) to list unused exports in modules you keep.

