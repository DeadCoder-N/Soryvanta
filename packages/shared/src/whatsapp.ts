/**
 * AiSensy Campaign API configuration.
 *
 * The Campaign API fallback (backend.aisensy.com/campaign/t1/api/v2) sends
 * messages by matching the `campaignName` field against a campaign that must
 * already exist and be set "Live" in the AiSensy dashboard. That name is an
 * external, user-created identifier, so it is read from the environment
 * rather than hard-coded in application source.
 *
 * When the variable is unset, the fallback is disabled entirely and a clear,
 * non-sensitive diagnostic is logged. We never send a request with a guessed
 * or placeholder campaign identifier, because AiSensy rejects unknown campaign
 * names and the request would fail.
 */

export const DEFAULT_AISENSY_CAMPAIGN_NAME = ''

let warnedMissing = false

/**
 * Resolve the configured AiSensy campaign name.
 *
 * Returns the trimmed value of `AISENSY_CAMPAIGN_NAME` when set, otherwise
 * `null`. Callers must treat `null` as "Campaign API fallback disabled".
 *
 * The diagnostic warning is emitted at most once per process so it does not
 * spam webhook logs on every outbound reply.
 */
export function getAiSensyCampaignName(): string | null {
  const raw = process.env.AISENSY_CAMPAIGN_NAME
  if (raw === undefined || raw === null) {
    if (!warnedMissing) {
      warnedMissing = true
      console.warn(
        '[AiSensy] AISENSY_CAMPAIGN_NAME is not set. The Campaign API fallback is ' +
          'disabled. Outbound replies will use the Project API only. Create an ' +
          'API campaign in the AiSensy dashboard and set AISENSY_CAMPAIGN_NAME ' +
          'to its exact name to enable the fallback.'
      )
    }
    return null
  }

  const trimmed = String(raw).trim()
  if (!trimmed) {
    if (!warnedMissing) {
      warnedMissing = true
      console.warn(
        '[AiSensy] AISENSY_CAMPAIGN_NAME is set to an empty value. The Campaign ' +
          'API fallback is disabled.'
      )
    }
    return null
  }

  return trimmed
}

/** Test-only: reset the cached "already warned" state. */
export function __resetAiSensyCampaignNameWarned() {
  warnedMissing = false
}