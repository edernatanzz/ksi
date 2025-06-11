import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InputField } from '@/components/atoms/InputField/InputField'

describe('InputField Component', () => {
  describe('Basic Rendering', () => {
    it('When InputField is rendered, then should display input and label', () => {
      // Arrange
      const props = {
        label: 'Username',
        value: '',
        onChange: vi.fn()
      }
      
      // Act
      render(<InputField {...props} />)
      
      // Assert
      expect(screen.getByText('Username')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('When InputField has placeholder, then should display placeholder', () => {
      // Arrange
      const props = {
        label: 'Email',
        value: '',
        onChange: vi.fn(),
        placeholder: 'Enter email'
      }
      
      // Act
      render(<InputField {...props} />)
      
      // Assert
      expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
    })

    it('When InputField has value, then should display value', () => {
      // Arrange
      const props = {
        label: 'Name',
        value: 'John',
        onChange: vi.fn()
      }
      
      // Act
      render(<InputField {...props} />)
      
      // Assert
      expect(screen.getByDisplayValue('John')).toBeInTheDocument()
    })
  })

  describe('Input Types', () => {
    it('When InputField type is email, then should show email icon', () => {
      // Arrange
      const props = {
        label: 'Email',
        type: 'email' as const,
        value: '',
        onChange: vi.fn()
      }
      
      // Act
      render(<InputField {...props} />)
      
      // Assert
      expect(screen.getByTestId('EmailIcon')).toBeInTheDocument()
    })

    it('When InputField type is password, then should show lock icon and toggle button', () => {
      // Arrange
      const props = {
        label: 'Password',
        type: 'password' as const,
        value: '',
        onChange: vi.fn()
      }
      
      // Act
      render(<InputField {...props} />)
      
      // Assert
      expect(screen.getByTestId('LockIcon')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Password Toggle', () => {
    it('When password toggle is clicked, then should change visibility', async () => {
      // Arrange
      const user = userEvent.setup()
      const props = {
        label: 'Password',
        type: 'password' as const,
        value: 'secret',
        onChange: vi.fn()
      }
      
      // Act
      render(<InputField {...props} />)
      const toggleButton = screen.getByRole('button')
      
      expect(screen.getByTestId('VisibilityIcon')).toBeInTheDocument()
      
      await user.click(toggleButton)
      
      // Assert
      expect(screen.getByTestId('VisibilityOffIcon')).toBeInTheDocument()
    })
  })

  describe('Events', () => {
    it('When user types, then should call onChange', async () => {
      // Arrange
      const user = userEvent.setup()
      const mockOnChange = vi.fn()
      const props = {
        label: 'Test',
        value: '',
        onChange: mockOnChange
      }
      
      // Act
      render(<InputField {...props} />)
      const input = screen.getByRole('textbox')
      await user.type(input, 'a')
      
      // Assert
      expect(mockOnChange).toHaveBeenCalledWith('a')
    })
  })

  describe('Error State', () => {
    it('When InputField has error, then should show error message', () => {
      // Arrange
      const props = {
        label: 'Email',
        value: '',
        onChange: vi.fn(),
        error: 'Required field'
      }
      
      // Act
      render(<InputField {...props} />)
      
      // Assert
      expect(screen.getByText('Required field')).toBeInTheDocument()
    })
  })

  describe('Disabled State', () => {
    it('When InputField is disabled, then input should be disabled', () => {
      // Arrange
      const props = {
        label: 'Test',
        value: '',
        onChange: vi.fn(),
        disabled: true
      }
      
      // Act
      render(<InputField {...props} />)
      
      // Assert
      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })

  describe('Required Field', () => {
    it('When InputField is required, then should show asterisk', () => {
      // Arrange
      const props = {
        label: 'Required Field',
        value: '',
        onChange: vi.fn(),
        required: true
      }
      
      // Act
      render(<InputField {...props} />)
      
      // Assert
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })
})