<!--
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-05-18 14:17:07
 * @LastEditTime: 2026-05-18 14:48:30
 * @LastEditors: lizhiliang
 * @Usage: 
-->
<template>
  <div>
    <h1>css封装方案</h1>
    <h2>方案1： CSS 变量 + 作用域类名</h2>
    <section>
      <div class="my-button--root">
        <button class="my-button--inner">Submit</button>
      </div>
    </section>
    <h3>方案2： 零运行时 CSS-in-JS（Vanilla Extract）</h3>
    <section>
        <div :class="styles.root">
            <button :class="styles.inner">OK</button>
        </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import * as styles from './Button.css.ts';
// import { ref } from 'vue'

// const feature = ref()
</script>

<style>
.my-button--root {
  /* 定义局部变量 */
  --btn-bg: var(--theme-primary, #3b82f6);
  --btn-color: white;
}

.my-button--inner {
  background: var(--btn-bg);
  color: var(--btn-color);
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
}
</style>
