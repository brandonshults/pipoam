# Change Log

## [1.0.2]
### Fixed
- Scroll bars on the map.

### Added
- "Merge From File" and "Merge From DB" controls under the points menu.
  - All merged points that have the exact same key/value pairs will be de-duplicated and only one 
  will make it into the resulting set of points.
- Some JSON files for testing.  Right now testing is manual, but these are useful.

## [1.0.1] - 2016-09-01
### Added
- This changelog, and a retroactive entry to describe the latest changes.

## [1.0.0] - 2016-09-01

### Removed
- Set Location control.

### Added
- "Center map when points load" control under "Points"
  - If this is toggled, the map will change the viewport to fit the points loaded. 
- Smart viewports
  - Your latest zoom and location will be saved and loaded when you leave and return.
    This behavior is overridden by the "Center map when points load" control.
