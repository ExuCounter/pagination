import { List } from '../List'
import { useState } from 'react'
import RSelect, { ValueType } from 'react-select'

const fakeData = [
  { title: '1' },
  { title: '2' },
  { title: '3' },
  { title: '4' },
  { title: '5' },
  { title: '6' },
  { title: '7' },
  { title: '8' },
  { title: '9' },
  { title: '10' },
  { title: '11' },
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

  const handleSelect = (value: OptionType | null) => {
    setCurrentOption(value)
  }

  return (
    <>
      <RSelect
        options={options}
        defaultValue={options[0]}
        onChange={(e) => handleSelect(e)}
      />
      <List visibleItemsNumber={currentOption!.value} data={fakeData} />
    </>
  )
}
