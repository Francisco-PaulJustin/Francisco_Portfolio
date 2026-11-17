# Changelog

All notable changes to this portfolio are listed here, newest first.

Versions follow [Semantic Versioning](https://semver.org): **MAJOR.MINOR.PATCH**

- **MAJOR** (2.0.0): the site changes in a big, visible way, like a full redesign
- **MINOR** (1.1.0): something new is added, like a section, page or feature
- **PATCH** (1.1.1): a fix or small content update

## [2.1.0] - 2026-11-18

### Added
- Project cards pile up while you scroll, like the first design: each card sticks under the nav and the earlier ones shrink and dim as the next slides over (large screens only; a plain list on phones and with reduced motion)

### Changed
- Project hover effects from the first design are back: the cover zooms in, the card border brightens, and a round arrow turns amber and rotates

## [2.0.1] - 2026-11-17

### Added
- Profile photo in the About section
- Résumé PDF: the "Download résumé" and "Read my full résumé" links now open it

## [2.0.0] - 2026-11-17

### Changed
- Redesigned the whole frontend as a deployment pipeline: every section is a numbered stage
- New look: graphite and amber colors, Archivo and Geist fonts
- Hero shows an animated deploy pipeline that finishes "ready for OJT"
- Skills are now an architecture diagram (Client → Server → Data → Container → Cloud)
- Projects are spec-sheet rows; Journey is a release-log list
- Version number now shows in the footer

### Fixed
- The large name in the footer no longer gets cut off on the right

## [1.1.1] - 2026-11-17

### Fixed
- Hero no longer lags while scrolling (replaced CSS masks and glass blur with cheap overlays)

## [1.1.0] - 2026-11-17

### Added
- "Coming soon" placeholders for the photo, screenshots and résumé, so the live site looks finished while content is still being added

## [1.0.0] - 2026-11-17

### Added
- First version: hero, about, projects with case-study pages, skills, journey and contact
- Light and dark themes, smooth scrolling, reduced-motion support
