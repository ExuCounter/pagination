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
  padding: 6px 5px;
  font-size: 12px;
  border: solid 1px #e2e2e2;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
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
            <Text display="inline">{label}</Text>
            <Initial {...props} ref={ref} />
          </label>
        )}
        {!label && <Initial {...props} ref={ref} />}
      </Flex>
    )
  }
)
