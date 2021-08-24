import { safeAxios } from '../../utils/safe-axios'
import type { Health } from '../../types/debug'
import { engines } from '../../../../package.json'
export const SUPPORTED_BEE_VERSION_EXACT = engines.pen
export const SUPPORTED_BEE_VERSION = engines.pen.substr(0, engines.pen.indexOf('-'))

/**
 * Get health of node
 *
 * @param url Bee debug URL
 */
export async function getHealth(url: string): Promise<Health> {
  const response = await safeAxios<Health>({
    method: 'get',
    url: `${url}/health`,
    responseType: 'json',
  })

  return response.data
}

/**
 * Connnects to a node and checks if it is a supported Bee version by the bee-js
 *
 * @param url Bee debug URL
 *
 * @returns true if the Bee node version is supported
 */
export async function isSupportedVersion(url: string): Promise<boolean> {
  const { version } = await getHealth(url)

  return version === SUPPORTED_BEE_VERSION_EXACT
}
