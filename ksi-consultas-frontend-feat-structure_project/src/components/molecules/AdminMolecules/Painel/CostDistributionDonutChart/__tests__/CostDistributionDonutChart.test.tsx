import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import CostDistributionDonutChart from '../CostDistributionDonutChart'

// Mock do Recharts com mais detalhes
vi.mock('recharts', () => ({
  ResponsiveContainer: vi.fn(({ children, width, height }) => (
    <div data-testid="responsive-container" data-width={width} data-height={height}>
      {children}
    </div>
  )),
  PieChart: vi.fn(({ children }) => (
    <div data-testid="pie-chart">{children}</div>
  )),
  Pie: vi.fn(({ cx, cy, innerRadius, outerRadius, dataKey, children }) => (
    <div 
      data-testid="pie"
      data-cx={cx}
      data-cy={cy}
      data-inner-radius={innerRadius}
      data-outer-radius={outerRadius}
      data-data-key={dataKey}
    >
      {children}
    </div>
  )),
  Cell: vi.fn(({ fill }) => (
    <div data-testid="cell" data-fill={fill} />
  )),
  Tooltip: vi.fn(({ formatter, contentStyle }) => (
    <div 
      data-testid="tooltip"
      data-formatter={typeof formatter}
      data-content-style={JSON.stringify(contentStyle)}
    />
  ))
}))

describe('CostDistributionDonutChart', () => {
  const mockData = [
    { name: 'API 1', value: 1000, color: '#FF6B6B', percentage: '40%' },
    { name: 'API 2', value: 750, color: '#4ECDC4', percentage: '30%' }
  ]

  describe('When component renders with data', () => {
    it('then displays chart with correct props', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert
      const container = screen.getByTestId('responsive-container')
      expect(container).toHaveAttribute('data-width', '100%')
      expect(container).toHaveAttribute('data-height', '200')

      const pie = screen.getByTestId('pie')
      expect(pie).toHaveAttribute('data-cx', '50%')
      expect(pie).toHaveAttribute('data-cy', '50%')
      expect(pie).toHaveAttribute('data-inner-radius', '60')
      expect(pie).toHaveAttribute('data-outer-radius', '80')
      expect(pie).toHaveAttribute('data-data-key', 'value')
    })

    it('then renders cells with correct colors', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert
      const cells = screen.getAllByTestId('cell')
      expect(cells).toHaveLength(2)
      expect(cells[0]).toHaveAttribute('data-fill', '#FF6B6B')
      expect(cells[1]).toHaveAttribute('data-fill', '#4ECDC4')
    })

    it('then configures tooltip correctly', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert
      const tooltip = screen.getByTestId('tooltip')
      expect(tooltip).toHaveAttribute('data-formatter', 'function')
      
      const contentStyle = JSON.parse(tooltip.getAttribute('data-content-style') || '{}')
      expect(contentStyle.backgroundColor).toBe('#1e293b')
      expect(contentStyle.border).toBe('none')
      expect(contentStyle.borderRadius).toBe('8px')
      expect(contentStyle.color).toBe('#fff')
      expect(contentStyle.padding).toBe('8px 12px')
    })
  })

  describe('When component renders with empty data', () => {
    it('then still renders container and chart structure', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={[]} />)

      // Assert
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument()
      expect(screen.getByTestId('pie')).toBeInTheDocument()
      expect(screen.getByTestId('tooltip')).toBeInTheDocument()
      expect(screen.queryAllByTestId('cell')).toHaveLength(0)
    })
  })

  describe('When component renders with single data item', () => {
    it('then renders one cell', () => {
      // Arrange
      const singleData = [{ name: 'API 1', value: 1000, color: '#FF6B6B', percentage: '100%' }]

      // Act
      render(<CostDistributionDonutChart data={singleData} />)

      // Assert
      const cells = screen.getAllByTestId('cell')
      expect(cells).toHaveLength(1)
      expect(cells[0]).toHaveAttribute('data-fill', '#FF6B6B')
    })
  })
})