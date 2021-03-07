import styled, { css } from 'styled-components'
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import { Flex } from 'components/shared/Flex'
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
  border,
  BorderProps,
} from 'styled-system'

interface InititalProps
  extends ColorProps,
    SizeProps,
    DisplayProps,
    SpaceProps,
    TypographyProps,
    LayoutProps,
    BorderProps {}

interface CustomProps {
  sizing?: 'xs' | 'sm' | 'md' | 'lg'
}

const sizing = ({ sizing }: CircleProps) => {
  switch (sizing) {
    case 'xs': {
      return css`
        width: 20px;
        height: 20px;
        font-size: 12px;
        background-color: ${(props) => props.theme.colors.main};
        color: ${(props) => props.theme.colors.white};
        border: none;
      `
    }
  }
}

const Initial = styled(Flex)`
  align-items: center;
  justify-content: center;
  cursor: default;
  ${color}
  ${size}
  ${display}
  ${space}
  ${typography}
  ${layout}
  ${border}
  ${sizing}
`

type CircleProps = PropsWithChildren<{}> &
  ComponentPropsWithoutRef<'div'> &
  InititalProps &
  CustomProps

export const Circle = ({ children, ...props }: CircleProps) => (
  <Initial {...props}>{children}</Initial>
)
