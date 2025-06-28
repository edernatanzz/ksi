import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ClassificationList } from '../ClassificationList'

describe('ClassificationList', () => {
  describe('When component renders with empty classifications', () => {
    it('then should render empty list', () => {
      // Arrange
      const props = {
        classifications: [],
        activeClassification: ''
      }

      // Act
      render(<ClassificationList {...props} />)

      // Assert
      const list = screen.getByRole('list')
      expect(list).toBeInTheDocument()
      expect(list).toBeEmptyDOMElement()
    })
  })

  describe('When component renders with classifications but no active classification', () => {
    it('then should render all classifications without active chip', () => {
      // Arrange
      const props = {
        classifications: ['Categoria A', 'Categoria B', 'Categoria C'],
        activeClassification: ''
      }

      // Act
      render(<ClassificationList {...props} />)

      // Assert
      expect(screen.getByText('Categoria A')).toBeInTheDocument()
      expect(screen.getByText('Categoria B')).toBeInTheDocument()
      expect(screen.getByText('Categoria C')).toBeInTheDocument()
      expect(screen.queryByText('Atual')).not.toBeInTheDocument()
    })
  })

  describe('When component renders with classifications and active classification', () => {
    it('then should render all classifications with active chip on correct item', () => {
      // Arrange
      const props = {
        classifications: ['Categoria A', 'Categoria B', 'Categoria C'],
        activeClassification: 'Categoria B'
      }

      // Act
      render(<ClassificationList {...props} />)

      // Assert
      expect(screen.getByText('Categoria A')).toBeInTheDocument()
      expect(screen.getByText('Categoria B')).toBeInTheDocument()
      expect(screen.getByText('Categoria C')).toBeInTheDocument()
      expect(screen.getByText('Atual')).toBeInTheDocument()
    })
  })

  describe('When component renders with single classification as active', () => {
    it('then should render single item with active chip', () => {
      // Arrange
      const props = {
        classifications: ['Única Categoria'],
        activeClassification: 'Única Categoria'
      }

      // Act
      render(<ClassificationList {...props} />)

      // Assert
      expect(screen.getByText('Única Categoria')).toBeInTheDocument()
      expect(screen.getByText('Atual')).toBeInTheDocument()
    })
  })

  describe('When component renders with multiple classifications', () => {
    it('then should render correct number of list items', () => {
      // Arrange
      const props = {
        classifications: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
        activeClassification: 'Item 3'
      }

      // Act
      render(<ClassificationList {...props} />)

      // Assert
      const listItems = screen.getAllByRole('listitem')
      expect(listItems).toHaveLength(5)
    })
  })

  describe('When active classification does not match any classification', () => {
    it('then should render classifications without active chip', () => {
      // Arrange
      const props = {
        classifications: ['Categoria A', 'Categoria B'],
        activeClassification: 'Categoria Inexistente'
      }

      // Act
      render(<ClassificationList {...props} />)

      // Assert
      expect(screen.getByText('Categoria A')).toBeInTheDocument()
      expect(screen.getByText('Categoria B')).toBeInTheDocument()
      expect(screen.queryByText('Atual')).not.toBeInTheDocument()
    })
  })

  describe('When classifications contain special characters', () => {
    it('then should render classifications with special characters correctly', () => {
      // Arrange
      const props = {
        classifications: ['Categoria & Especial', 'Categoria > Teste', 'Categoria < Outro'],
        activeClassification: 'Categoria & Especial'
      }

      // Act
      render(<ClassificationList {...props} />)

      // Assert
      expect(screen.getByText('Categoria & Especial')).toBeInTheDocument()
      expect(screen.getByText('Categoria > Teste')).toBeInTheDocument()
      expect(screen.getByText('Categoria < Outro')).toBeInTheDocument()
      expect(screen.getByText('Atual')).toBeInTheDocument()
    })
  })

  describe('When classifications contain very long text', () => {
    it('then should render long text classifications correctly', () => {
      // Arrange
      const longText = 'Esta é uma classificação muito longa que pode quebrar o layout se não for tratada adequadamente'
      const props = {
        classifications: [longText, 'Categoria Normal'],
        activeClassification: longText
      }

      // Act
      render(<ClassificationList {...props} />)

      // Assert
      expect(screen.getByText(longText)).toBeInTheDocument()
      expect(screen.getByText('Categoria Normal')).toBeInTheDocument()
      expect(screen.getByText('Atual')).toBeInTheDocument()
    })
  })

  describe('When component renders with duplicate classifications', () => {
    it('then should render all duplicates with unique keys', () => {
      // Arrange
      const props = {
        classifications: ['Categoria A', 'Categoria A', 'Categoria B'],
        activeClassification: 'Categoria A'
      }

      // Act
      render(<ClassificationList {...props} />)

      // Assert
      const categoryAElements = screen.getAllByText('Categoria A')
      expect(categoryAElements).toHaveLength(2)
      expect(screen.getByText('Categoria B')).toBeInTheDocument()
      const atualElements = screen.getAllByText('Atual')
      expect(atualElements).toHaveLength(2)
    })
  })

  describe('When component has proper accessibility attributes', () => {
    it('then should have correct ARIA roles and structure', () => {
      // Arrange
      const props = {
        classifications: ['Categoria A', 'Categoria B'],
        activeClassification: 'Categoria A'
      }

      // Act
      render(<ClassificationList {...props} />)

      // Assert
      const list = screen.getByRole('list')
      const listItems = screen.getAllByRole('listitem')
      
      expect(list).toBeInTheDocument()
      expect(listItems).toHaveLength(2)
      listItems.forEach(item => {
        expect(item).toBeInTheDocument()
      })
    })
  })
})