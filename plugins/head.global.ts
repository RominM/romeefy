export default defineNuxtPlugin(() => {
  useHead({
    titleTemplate: (titleChunk) =>
      titleChunk ? `${titleChunk} | Romeefy` : 'Romeefy',
    meta: [
      { name: 'description', content: 'Clone de spotify.' },
      { property: 'og:title', content: 'Romeefy' },
      { property: 'og:type', content: 'website' }
    ]
  })
})
