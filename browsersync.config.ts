/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
import browserSync from 'browser-sync'
import { resolve } from 'path'

const defaults: browserSync.Options = {
  files: ['./src/'],
  watchEvents: ['change', 'add'],
  watch: false,
  single: false,
  watchOptions: {
    ignoreInitial: true
  },
  ghostMode: {
    clicks: true,
    scroll: true,
    forms: {
      submit: true,
      inputs: true,
      toggles: true
    }
  },
  logLevel: 'info',
  logPrefix: 'Browsersync',
  logConnections: false,
  logFileChanges: true,
  logSnippet: true,
  rewriteRules: [],
  open: false,
  browser: 'default',
  cors: false,
  xip: false,
  reloadOnRestart: false,
  notify: true,
  scrollProportionally: true,
  scrollThrottle: 0,
  scrollRestoreTechnique: 'window.name',
  scrollElements: [],
  scrollElementMapping: [],
  reloadDelay: 0,
  reloadDebounce: 500,
  reloadThrottle: 0,
  plugins: [],
  injectChanges: true,
  minify: true,
  localOnly: false,
  codeSync: true,
  timestamps: true,
  clientEvents: [
    'scroll',
    'scroll:element',
    'input:text',
    'input:toggles',
    'form:submit',
    'form:reset',
    'click'
  ],
  socket: {
    path: '/browser-sync/socket.io',
    clientPath: '/browser-sync',
    namespace: '/browser-sync',
    clients: { heartbeatTimeout: 5000 }
  },
  tagNames: {
    less: 'link',
    scss: 'link',
    css: 'link',
    jpg: 'img',
    jpeg: 'img',
    png: 'img',
    svg: 'img',
    gif: 'img',
    js: 'script'
  }
}

export const bsConfigApp = {
  ...defaults,
  ui: { port: 3001 },
  port: 8000,
  server: {
    baseDir: resolve(__dirname, 'dist'),
    index: 'index.html'
  }
}
