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
  variant?: string
  sizing?: 'xs' | 'sm' | 'md' | 'lg'
  active?: boolean
}

const variant = ({ variant, active }: ButtonProps) => {
  switch (variant) {
    case 'primary': {
      return css`
        background-color: ${(props) =>
          active ? props.theme.colors.mainDarker : props.theme.colors.main};
        color: ${(props) => props.theme.colors.white};
        border: none;

        &:hover {
          background-color: ${(props) => props.theme.colors.mainDarker};
        }
      `
    }
  }
}

const sizing = ({ sizing }: ButtonProps) => {
  switch (sizing) {
    case 'md': {
      return css`
        padding: 7px 10px;
      `
    }
  }
}

const Initial = styled.button`
  outline: none;
  cursor: pointer;
  ${color}
  ${size}
  ${display}
  ${space}
  ${typography}
  ${layout}
  ${border}
  ${variant}
  ${sizing}
`

type ButtonProps = PropsWithChildren<{}> &
  ComponentPropsWithoutRef<'button'> &
  InititalProps &
  CustomProps

export const Button = ({ children, ...props }: ButtonProps) => (
  <Initial {...props}>{children}</Initial>
)
