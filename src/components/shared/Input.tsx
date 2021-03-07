import { ComponentPropsWithRef, forwardRef } from 'react'
import styled from 'styled-components'
import { Flex } from 'components/shared/Flex'
import { Text } from 'components/shared/Text'
import {
  color,
  ColorProps,
  size,
  SizeProps,
  display,
  DisplayProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  layout,
  LayoutProps,
} from 'styled-system'

interface InititalProps
  extends ColorProps,
    SizeProps,
    DisplayProps,
    SpaceProps,
    TypographyProps,
    LayoutProps {}

const Initial = styled.input`
  ${color}
  ${size}
  ${display}
  ${space}
  ${typography}
  ${layout}
`

type CustomProps = {
  label?: string
}

type InputProps = ComponentPropsWithRef<'input'> & InititalProps & CustomProps

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <Flex alignItems="center">
        {label && (
          <label>
            <Text display="inline" pr={2}>
              {label}
            </Text>
            <Initial {...props} ref={ref} />
          </label>
        )}
        {!label && <Initial {...props} ref={ref} />}
      </Flex>
    )
  }
)
