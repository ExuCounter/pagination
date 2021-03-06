import { ComponentPropsWithRef, forwardRef } from 'react'
type CustomInputProps = {
  mask?: 'number' | 'code'
  label?: string
}

type InputProps = ComponentPropsWithRef<'input'> & CustomInputProps

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ mask, label, ...props }, ref) => {
    return (
      <>
        {label && (
          <label>
            <span>{label}</span>
            <input {...props} ref={ref} />
          </label>
        )}
        {!label && <input {...props} ref={ref} />}
      </>
    )
  }
)
