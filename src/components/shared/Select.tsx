import RSelect, { Props as RSelectProps } from 'react-select'
import { Flex } from 'components/shared/Flex'
import { Text } from 'components/shared/Text'
import { Box } from 'components/shared/Box'

type SelectProps<T, isMulti extends boolean> = RSelectProps<T, isMulti>

const customStyles = {
  option: (provided: any) => ({
    ...provided,
  }),
  control: (provided: any) => ({
    ...provided,
    minHeight: '25px',
    width: 200,
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    fontSize: 12,
    padding: '0px 4px',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    fontSize: 12,
  }),
}

export const Select = <T, isMulti extends false>({
  options = [],
  label,
  onChange,
  ...props
}: SelectProps<T, isMulti>) => {
  return (
    <Flex alignItems="center">
      {label ? <Text pr={3}>{label}</Text> : null}
      <Box>
        <RSelect<T, isMulti>
          options={options}
          styles={customStyles}
          onChange={(value, action) => {
            onChange && onChange(value, action)
          }}
          {...props}
        />
      </Box>
    </Flex>
  )
}
