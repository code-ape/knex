/** Sqlite3 version as major, minor, and patch */
export type Sqlite3Version = [number, number, number]
/** Version number in integer comparison friendly format, example: `3.38.2` => `3038002` */
type Sqlite3VersionNumber = number

/**
 * Checks if driver is of minimum desired level, returns undefined if driver fails to load or
 * doesn't have `VERSION_NUMBER` property.
 */
export function isSqlite3DriverOfVersionOrHigher(minVersion: Sqlite3Version, driver?: any): boolean | undefined {
  let d = driver
  // If no driver given then attempt to load one and return undefined if failed to load
  if (driver === undefined) {
    try { d = require('sqlite3') }
    catch { return undefined }
  }
  // If driver has numeric property 'VERSION_NUMBER'
  if (typeof d === 'object' && d.hasOwnProperty('VERSION_NUMBER') && typeof d.VERSION_NUMBER === 'number') {
    const minVersionNumber: Sqlite3VersionNumber = (minVersion[0] * 10_000) + (minVersion[1] * 100) + minVersion[2]
    return minVersionNumber >= d.VERSION_NUMBER
  } else {
    return undefined
  }
}
