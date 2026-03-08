import { defineConfigWithVueTs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores([
    '**/dist/**',
    '**/coverage/**',
    '**/node_modules/**'
  ]),

  
  ...pluginVue.configs['flat/essential'], // Vue 基础规则

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'), // Oxlint (超快)

  // 自定义规则
  {
    rules: {
      'vue/multi-word-component-names': 'off', // 允许 index.vue
      'vue/script-setup-uses-vars': 'error', // script setup 不需要 import Vue
      'no-console': 'off', // console 允许
    }
  },
  
  skipFormatting, // 避免和 prettier 冲突
)