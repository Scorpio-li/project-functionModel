/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-05-18 14:26:37
 * @LastEditTime: 2026-05-18 14:44:34
 * @LastEditors: lizhiliang
 * @Usage: 
 */
import { style } from '@vanilla-extract/css';

export const root = style({
  vars: {
    '--btn-bg': '#3b82f6'
  }
});

export const inner = style({
  background: 'var(--btn-bg)',
  color: 'white',
  borderRadius: 4,
  selectors: {
    '&:hover': { opacity: 0.9 }
  }
});