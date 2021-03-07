import styled, { css } from 'styled-components'
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import {
  color,
  ColorProps,
  size,
  SizeProps,
  space,
  SpaceProps,
  layout,
  LayoutProps,
} from 'styled-system'

interface InititalProps
  extends ColorProps,
    SizeProps,
    SpaceProps,
    LayoutProps {}

const Initial = styled.div`
  display: block;
  ${color};
  ${size};
  ${space};
  ${layout};
`

type BoxProps = PropsWithChildren<{}> &
  ComponentPropsWithoutRef<'div'> &
  InititalProps

export const Box = ({ children, ...props }: BoxProps) => (
  <Initial {...props}>{children}</Initial>
)
