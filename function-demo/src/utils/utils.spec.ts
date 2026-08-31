import { describe, it, expect } from 'vitest'
import { formatPrice } from './utils.ts'

describe('formatPrice', () => {
  it('应该正确格式化价格', () => {
    expect(formatPrice(10)).toBe('￥10.00')
    expect(formatPrice(10.5)).toBe('￥10.50')
    expect(formatPrice(10.555)).toBe('￥10.56')
  })
})