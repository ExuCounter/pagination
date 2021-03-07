import styled, { css } from 'styled-components'
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import {
  color,
  ColorProps,
  size,
  SizeProps,
  flexbox,
  FlexboxProps,
  space,
  SpaceProps,
  layout,
  LayoutProps,
  border,
  BorderProps,
  typography,
  TypographyProps,
} from 'styled-system'

interface InititalProps
  extends ColorProps,
    SizeProps,
    FlexboxProps,
    SpaceProps,
    LayoutProps,
    BorderProps,
    TypographyProps {}

interface CustomProps {
  bordered?: boolean
}

const bordered = ({ bordered }: CustomProps) => css`
  border: ${bordered ? 'solid 1px #e2e2e2' : 'unset'};
`

const Initial = styled.div`
  display: flex;
  ${color};
  ${size};
  ${flexbox};
  ${space};
  ${layout};
  ${border}
  ${typography}
  ${bordered}
`

type FlexProps = PropsWithChildren<{}> &
  ComponentPropsWithoutRef<'div'> &
  InititalProps &
  CustomProps

export const Flex = ({ children, ...props }: FlexProps) => (
  <Initial {...props}>{children}</Initial>
)
