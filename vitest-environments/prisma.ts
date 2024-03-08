import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup(global, options) {
    console.log('setup')

    return {
        async teardown(){
            console.log('Teardown')
        }
    }
  },
}
