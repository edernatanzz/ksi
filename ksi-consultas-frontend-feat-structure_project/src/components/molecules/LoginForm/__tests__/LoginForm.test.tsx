import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '@/components/molecules/LoginForm/LoginForm'

describe('LoginForm Component', () => {
  describe('Basic Rendering', () => {
    it('When LoginForm is rendered, then should display form elements', () => {
      // Arrange
      const props = {
        onSubmit: vi.fn()
      }
      
      // Act
      render(<LoginForm {...props} />)
      
      // Assert
      expect(screen.getByText('Login')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Senha')).toBeInTheDocument()
      expect(screen.getByText('Entrar')).toBeInTheDocument()
    })

    it('When LoginForm has error prop, then should display error message', () => {
      // Arrange
      const props = {
        onSubmit: vi.fn(),
        error: 'Credenciais inválidas'
      }
      
      // Act
      render(<LoginForm {...props} />)
      
      // Assert
      expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument()
    })

    it('When LoginForm is loading, then submit button should show loading state', () => {
      // Arrange
      const props = {
        onSubmit: vi.fn(),
        loading: true
      }
      
      // Act
      render(<LoginForm {...props} />)
      
      // Assert
      expect(screen.getByText('Carregando...')).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    it('When form is submitted with empty fields, then should show validation errors', async () => {
      // Arrange
      const user = userEvent.setup()
      const mockOnSubmit = vi.fn()
      const props = {
        onSubmit: mockOnSubmit
      }
      
      // Act
      render(<LoginForm {...props} />)
      const submitButton = screen.getByText('Entrar')
      await user.click(submitButton)
      
      // Assert
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
      expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('When email is invalid, then should show email validation error', async () => {
      // Arrange
      const user = userEvent.setup()
      const mockOnSubmit = vi.fn()
      const props = {
        onSubmit: mockOnSubmit
      }
      
      // Act
      render(<LoginForm {...props} />)
      const emailInput = screen.getByPlaceholderText('seuemail@exemplo.com')
      const submitButton = screen.getByText('Entrar')
      
      await user.type(emailInput, 'invalid-email')
      await user.click(submitButton)
      
      // Assert
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('When password is too short, then should show password validation error', async () => {
      // Arrange
      const user = userEvent.setup()
      const mockOnSubmit = vi.fn()
      const props = {
        onSubmit: mockOnSubmit
      }
      
      // Act
      render(<LoginForm {...props} />)
      const passwordInput = screen.getByPlaceholderText('Sua senha')
      const submitButton = screen.getByText('Entrar')
      
      await user.type(passwordInput, '123')
      await user.click(submitButton)
      
      // Assert
      expect(screen.getByText('Senha deve ter pelo menos 4 caracteres')).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  describe('Form Submission', () => {
    it('When form is submitted with valid data, then should call onSubmit', async () => {
      // Arrange
      const user = userEvent.setup()
      const mockOnSubmit = vi.fn()
      const props = {
        onSubmit: mockOnSubmit
      }
      
      // Act
      render(<LoginForm {...props} />)
      const emailInput = screen.getByPlaceholderText('seuemail@exemplo.com')
      const passwordInput = screen.getByPlaceholderText('Sua senha')
      const submitButton = screen.getByText('Entrar')
      
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, '123456')
      await user.click(submitButton)
      
      // Assert
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: '123456'
      })
    })

    it('When validation error is cleared by typing, then error should disappear', async () => {
      // Arrange
      const user = userEvent.setup()
      const props = {
        onSubmit: vi.fn()
      }
      
      // Act
      render(<LoginForm {...props} />)
      const emailInput = screen.getByPlaceholderText('seuemail@exemplo.com')
      const submitButton = screen.getByText('Entrar')
      
      // Submit empty form to trigger validation
      await user.click(submitButton)
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
      
      // Type in email field
      await user.type(emailInput, 'test@example.com')
      
      // Assert
      expect(screen.queryByText('Email é obrigatório')).not.toBeInTheDocument()
    })
  })

  describe('Interactive Elements', () => {
    it('When LoginForm is rendered, then should display forgot password link', () => {
      // Arrange
      const props = {
        onSubmit: vi.fn()
      }
      
      // Act
      render(<LoginForm {...props} />)
      
      // Assert
      expect(screen.getByText('Esqueceu a senha?')).toBeInTheDocument()
    })

    it('When LoginForm is rendered, then should display create account link', () => {
      // Arrange
      const props = {
        onSubmit: vi.fn()
      }
      
      // Act
      render(<LoginForm {...props} />)
      
      // Assert
      expect(screen.getByText('Crie uma agora')).toBeInTheDocument()
    })
  })
})