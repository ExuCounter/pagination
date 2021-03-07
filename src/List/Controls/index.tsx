import { Select } from '../../shared/Select'
import { Input } from '../../shared/Input'
import { ValueType } from 'react-select'
import { Flex } from 'shared/Flex'

export type VisibleItemsOptionType = { value: number; label: string }

export type ControlsProps = {
  handleSelect: (value: ValueType<VisibleItemsOptionType, false>) => void
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  selectOptions: VisibleItemsOptionType[]
}

export const Controls = ({
  handleSelect,
  handleInput,
  selectOptions,
}: ControlsProps) => {
  return (
    <Flex mb={2}>
      <Select
        label={'Number of visible elements'}
        options={selectOptions}
        defaultValue={selectOptions[0]}
        onChange={handleSelect}
      />
      <Input placeholder="Type here" label="Filter" onChange={handleInput} />
    </Flex>
  )
}
