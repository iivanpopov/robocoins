declare module 'virtual:messages/*' {
  const messages: Readonly<Record<string, import('@kanjou/react').Message>>
  export default messages
}
