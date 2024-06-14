import type { Environment } from 'vitest'
import { builtinEnvironments } from 'vitest/environments'

export default <Environment>{
  ...builtinEnvironments.jsdom,
  name: 'custom',
}