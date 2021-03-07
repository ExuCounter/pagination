import styled, { css } from 'styled-components'
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
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

const Initial = styled.button`
  ${color}
  ${size}
  ${display}
  ${space}
  ${typography}
  ${layout}
`

type ButtonProps = PropsWithChildren<{}> &
  ComponentPropsWithoutRef<'button'> &
  InititalProps

export const Button = ({ children, ...props }: ButtonProps) => (
  <Initial {...props}>{children}</Initial>
)
