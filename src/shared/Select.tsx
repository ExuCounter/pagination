import RSelect, { Props as RSelectProps } from 'react-select'
import { Flex } from 'shared/Flex'
import { Text } from 'shared/Text'
import { Box } from 'shared/Box'

type SelectProps<T, isMulti extends boolean> = RSelectProps<T, isMulti>

export const Select = <T, isMulti extends false>({
  options = [],
  label,
  onChange,
  ...props
}: SelectProps<T, isMulti>) => {
  return (
    <Flex alignItems="center">
      {label ? <Text pr={3}>{label}</Text> : null}
      <Box width={200}>
        <RSelect<T, isMulti>
          options={options}
          onChange={(value, action) => {
            onChange && onChange(value, action)
          }}
          {...props}
        />
      </Box>
    </Flex>
  )
}
