const WAID_PATTERN = /(?<=waid=)\d+(?=:)/

export class VCardUtils {
  static getWAId(vCard: string): string {
    const raw = Array.from(vCard.match(WAID_PATTERN) ?? [])[0]
    if (!raw) throw new Error('Invalid "vCard" format')

    return raw.concat('@c.us')
  }
}
