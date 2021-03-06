import RSelect, { Props as RSelectProps } from 'react-select'

type SelectProps<T, isMulti extends boolean> = RSelectProps<T, isMulti>

export const Select = <T, isMulti extends false>({
  options = [],
  onChange,
}: SelectProps<T, isMulti>) => {
  return (
    <div style={{ width: '200px' }}>
      <RSelect<T, isMulti>
        options={options}
        onChange={(value, action) => {
          onChange && onChange(value, action)
        }}
      />
    </div>
  )
}
