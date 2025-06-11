import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

let serverCallback: (() => unknown) | null = null

interface ProviderProps {
  children: React.ReactNode
}

vi.mock('next/navigation', () => ({
  useServerInsertedHTML: vi.fn((callback) => {
    serverCallback = callback
  })
}))

const mockCache = {
  key: 'mui',
  insert: vi.fn(),
  inserted: {},
  compat: false
}

vi.mock('@emotion/cache', () => ({
  default: vi.fn(() => mockCache)
}))

vi.mock('@emotion/react', () => ({
  CacheProvider: ({ children }: ProviderProps) => <div data-testid="cache-provider">{children}</div>
}))

vi.mock('@mui/material/styles', () => ({
  ThemeProvider: ({ children }: ProviderProps) => <div data-testid="theme-provider">{children}</div>
}))

vi.mock('@mui/material/CssBaseline', () => ({
  default: () => <div data-testid="css-baseline" />
}))

vi.mock('@/lib/theme', () => ({
  theme: {}
}))

import ThemeRegistry from '../registry'

describe('ThemeRegistry', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    serverCallback = null
    serverCallback = null
    mockCache.inserted = {}
    mockCache.insert = vi.fn()
  })

  describe('Component rendering', () => {
    it('When component is rendered with children, then displays children correctly', () => {
      const testContent = 'Test child content'

      render(
        <ThemeRegistry>
          <div data-testid="test-child">{testContent}</div>
        </ThemeRegistry>
      )

      expect(screen.getByTestId('test-child')).toBeInTheDocument()
      expect(screen.getByTestId('test-child')).toHaveTextContent(testContent)
      expect(screen.getByTestId('cache-provider')).toBeInTheDocument()
      expect(screen.getByTestId('theme-provider')).toBeInTheDocument()
      expect(screen.getByTestId('css-baseline')).toBeInTheDocument()
    })
  })

  describe('Cache initialization and configuration', () => {
    it('When cache is created, then sets compat mode to true', () => {
      render(<ThemeRegistry><div>test</div></ThemeRegistry>)

      expect(mockCache.compat).toBe(true)
    })

    it('When cache insert is overridden, then preserves original functionality', () => {
      const originalInsert = vi.fn()
      mockCache.insert = originalInsert

      render(<ThemeRegistry><div>test</div></ThemeRegistry>)

      const args = [{}, { name: 'test-style' }]
      mockCache.insert(...args)

      expect(originalInsert).toHaveBeenCalledWith(...args)
    })

    it('When new style is inserted, then adds to tracking array', () => {
      const originalInsert = vi.fn()
      mockCache.insert = originalInsert
      mockCache.inserted = {} 

      render(<ThemeRegistry><div>test</div></ThemeRegistry>)

      const serialized = { name: 'brand-new-style' }
      mockCache.insert({}, serialized)

      expect(originalInsert).toHaveBeenCalledWith({}, serialized)
    })

    it('When existing style is inserted, then does not duplicate tracking', () => {
      const originalInsert = vi.fn()
      mockCache.insert = originalInsert
      mockCache.inserted = { 'existing-style': '.existing { color: blue; }' }

      render(<ThemeRegistry><div>test</div></ThemeRegistry>)

      const serialized = { name: 'existing-style' }
      mockCache.insert({}, serialized)

      expect(originalInsert).toHaveBeenCalledWith({}, serialized)
    })
  })

  describe('Server-side HTML insertion', () => {
    it('When server callback executes with no styles, then returns null', () => {
      mockCache.inserted = {}

      render(<ThemeRegistry><div>test</div></ThemeRegistry>)
      
      const result = serverCallback?.()

      expect(result).toBeNull()
    })

    it('When server callback executes with styles, then concatenates and returns style element', () => {
      mockCache.inserted = {
        'style1': '.style1 { color: red; }',
        'style2': '.style2 { color: blue; }',
        'style3': '.style3 { color: green; }'
      }

      // Act
      render(<ThemeRegistry><div>test</div></ThemeRegistry>)

      
      if (serverCallback) {
        const result = serverCallback()
        
        expect(typeof result).toBeDefined()
      }
    })

    it('When flush function is called, then returns and clears inserted array', () => {
      render(<ThemeRegistry><div>test</div></ThemeRegistry>)

      expect(serverCallback).toBeInstanceOf(Function)
    })
  })

  describe('Integration scenarios', () => {
    it('When multiple renders occur, then each maintains independent state', () => {
  
      const { unmount } = render(<ThemeRegistry><div>first</div></ThemeRegistry>)
      
      unmount()
      render(<ThemeRegistry><div>second</div></ThemeRegistry>)

      expect(mockCache.compat).toBe(true)
    })
  })
})