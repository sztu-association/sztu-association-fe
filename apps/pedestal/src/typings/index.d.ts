// custom.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'micro-app': {
      name: string
      url: string
      iframe: boolean
    }
  }
}
