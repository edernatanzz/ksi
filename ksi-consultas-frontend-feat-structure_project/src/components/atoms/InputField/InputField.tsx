'use client'
import React, { forwardRef, useState } from 'react'
import { InputAdornment, TextField, IconButton } from '@mui/material'
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material'

export interface InputFieldProps {
  label: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
  fullWidth?: boolean
  required?: boolean
  autoComplete?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    disabled = false,
    fullWidth = true,
    required = false,
    autoComplete,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    
    const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    const getStartAdornment = () => {
      if (type === 'email') {
        return (
          <InputAdornment position="start">
            <Email className="text-gray-400" />
          </InputAdornment>
        )
      }
      if (type === 'password') {
        return (
          <InputAdornment position="start">
            <Lock className="text-gray-400" />
          </InputAdornment>
        )
      }
      return undefined
    }

    const getEndAdornment = () => {
      if (type === 'password') {
        return (
          <InputAdornment position="end">
            <IconButton
              onClick={handleTogglePasswordVisibility}
              edge="end"
              size="small"
              className="text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }
      return undefined
    }

    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-secondary-800 mb-2">
          {label}
          {required && <span className="text-primary-500 ml-1">*</span>}
        </label>
        <TextField
          ref={ref}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          error={!!error}
          helperText={error}
          disabled={disabled}
          fullWidth={fullWidth}
          autoComplete={autoComplete}
          InputProps={{
            startAdornment: getStartAdornment(),
            endAdornment: getEndAdornment(),
            className: "bg-white rounded-lg",
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#e2e8f0',
                borderWidth: '1px',
              },
              '&:hover fieldset': {
                borderColor: '#cbd5e1',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#e02725',
                borderWidth: '2px',
              },
              '&.Mui-error fieldset': {
                borderColor: '#ef4444',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#64748b',
              '&.Mui-focused': {
                color: '#e02725',
              },
            },
            '& .MuiFormHelperText-root': {
              marginLeft: 0,
              marginTop: '4px',
              fontSize: '0.75rem',
            },
          }}
          {...props}
        />
      </div>
    )
  }
)

InputField.displayName = 'InputField'

export default InputField