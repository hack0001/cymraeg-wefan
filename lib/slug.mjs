/**
 * Turns a Welsh phrase into the file name used for its recording.
 * "Bore da" -> "bore-da", "dŵr" -> "dwr", "Dw i'n dysgu Cymraeg" -> "dw-i-n-dysgu-cymraeg"
 * @param {string} cy
 * @returns {string}
 */
export function audioSlug(cy) {
  return cy
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
