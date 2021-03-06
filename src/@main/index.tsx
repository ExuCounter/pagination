import { List } from '../List'
import { useState, useRef } from 'react'
import { ValueType } from 'react-select'
import { Select } from '../shared/Select'
import { Input } from '../shared/Input'

const fakeData = [
  { title: '1aa' },
  { title: '2bb' },
  { title: '3' },
  { title: '4bbbb' },
  { title: '5' },
  { title: '6aa' },
  { title: '7bbbb' },
  { title: '8' },
  { title: '9aa' },
  { title: '10aaaa' },
  { title: '11aa' },
  { title: '12' },
]

type OptionType = { value: number; label: string }

const options: OptionType[] = [
  { value: 1, label: 'One Element' },
  { value: 2, label: 'Two Elements' },
  { value: 3, label: 'Three Elements' },
]

export const MainPage = () => {
  const [currentOption, setCurrentOption] = useState<
    ValueType<OptionType, false>
  >(options[0])
  const [inputValue, setInputValue] = useState<string>('')
  const ref = useRef<HTMLInputElement>(null)

  const handleSelect = (value: ValueType<OptionType, false>) => {
    setCurrentOption(value)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <>
      <div style={{ display: 'flex', width: '100%' }}>
        <Select
          options={options}
          defaultValue={options[0]}
          onChange={handleSelect}
        />
        <Input value={inputValue} ref={ref} onChange={handleInput} />
      </div>
      <List
        filterByTitle={inputValue}
        visibleItemsNumber={currentOption!.value}
        data={fakeData}
      />
    </>
  )
}
