import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest'
import {
  getAiSensyCampaignName,
  __resetAiSensyCampaignNameWarned,
} from '@marketing-os/shared'

const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

beforeEach(() => {
  delete process.env.AISENSY_CAMPAIGN_NAME
  __resetAiSensyCampaignNameWarned()
  warnSpy.mockClear()
})

afterAll(() => {
  warnSpy.mockRestore()
})

describe('getAiSensyCampaignName', () => {
  it('returns null and warns when the variable is unset', () => {
    expect(getAiSensyCampaignName()).toBeNull()
    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy.mock.calls[0]![0]).toMatch(/not set/)
  })

  it('does not warn more than once per process when unset', () => {
    getAiSensyCampaignName()
    getAiSensyCampaignName()
    expect(warnSpy).toHaveBeenCalledTimes(1)
  })

  it('returns the trimmed value when set', () => {
    process.env.AISENSY_CAMPAIGN_NAME = '  welcome-back  '
    expect(getAiSensyCampaignName()).toBe('welcome-back')
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it('returns null and warns when set to an empty value', () => {
    process.env.AISENSY_CAMPAIGN_NAME = '   '
    expect(getAiSensyCampaignName()).toBeNull()
    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy.mock.calls[0]![0]).toMatch(/empty value/)
  })

  it('never returns a hard-coded former-brand campaign name', () => {
    process.env.AISENSY_CAMPAIGN_NAME = 'marketing-os_reply'
    expect(getAiSensyCampaignName()).toBe('marketing-os_reply')
  })
})