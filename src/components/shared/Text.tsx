import styled from 'styled-components'
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
    SpaceProps,
    TypographyProps,
    LayoutProps,
    DisplayProps {}

const Initial = styled.p`
  ${color}
  ${size}
  ${display}
  ${space}
  ${typography}
  ${layout}
`

type TextProps = PropsWithChildren<{}> &
  ComponentPropsWithoutRef<'p'> &
  InititalProps

export const Text = ({ children, ...props }: TextProps) => (
  <Initial p={0} m={0} {...props}>
    {children}
  </Initial>
)
