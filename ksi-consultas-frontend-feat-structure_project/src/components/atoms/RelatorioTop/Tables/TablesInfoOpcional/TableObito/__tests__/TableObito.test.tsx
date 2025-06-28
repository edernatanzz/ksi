import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TableObito from '../TableObito'

describe('TableObito', () => {
  it("When rendered, then it should display title and default message", () => {
    // Arrange & Act
    render(<TableObito />)

    // Assert
    expect(screen.getByRole('heading', { name: /óbito/i })).toBeInTheDocument()
    expect(screen.getByText(/nenhuma informação encontrada/i)).toBeInTheDocument()
  })
})
