// CreditClassificationSection.test.tsx
import { render, screen } from '@testing-library/react'
import { CreditClassificationSection } from '../CreditClassificationSection'
import { vi } from 'vitest'

describe('CreditClassificationSection', () => {
  const baseProps = {
    document: '12345678900',
    personType: 'fisica',
    onNovaConsulta: vi.fn(),
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('When component renders, then the user classification is displayed in Avatar', () => {
    // Arrange
    render(<CreditClassificationSection {...baseProps} />)

    // Assert
    // Seleciona apenas o Avatar com AA
    const avatars = screen.getAllByText('AA');
    expect(avatars[0]).toBeInTheDocument();
  })

  it('When tooltip icon is hovered, then explanation is accessible', async () => {
    // Arrange
    render(<CreditClassificationSection {...baseProps} />)

    // Assert
    const tooltipButton = screen.getByLabelText('Classificação de Risco de Crédito')
    expect(tooltipButton).toBeInTheDocument()
  })
})
