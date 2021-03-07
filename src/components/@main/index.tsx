import React, { useState } from 'react'
import { List } from '../List'
import { Select } from 'components/shared/Select'
import { Input } from 'components/shared/Input'
import { Button } from 'components/shared/Button'
import { Flex } from 'components/shared/Flex'

type SelectOptionType = {
  value: number
  label: string
}

const FAKE_DATA = [
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

const SELECT_OPTIONS = [
  {
    value: 3,
    label: 'Three elements',
  },
  {
    value: 4,
    label: 'Four elements',
  },
  {
    value: 5,
    label: 'Five elements',
  },
]

type ListControlsProps = {
  isPaginationEnabled: boolean
  isFilterEnabled: boolean
  handlePaginationSelect: (value: SelectOptionType | null) => void
  handleFilterInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  filterString: string
  currentOption: SelectOptionType
}

const Controls = ({
  isPaginationEnabled,
  isFilterEnabled,
  handlePaginationSelect,
  handleFilterInput,
  filterString,
  currentOption,
}: ListControlsProps) => {
  return (
    <Flex justifyContent="space-between">
      {isPaginationEnabled && (
        <Select
          options={SELECT_OPTIONS}
          defaultValue={currentOption}
          onChange={handlePaginationSelect}
          label="Number of visible items:"
        />
      )}
      {isFilterEnabled && (
        <Flex ml="auto">
          <Input
            minHeight="25px"
            value={filterString}
            onChange={handleFilterInput}
            label="Search"
            placeholder="Search by value"
          />
        </Flex>
      )}
    </Flex>
  )
}

type ListSettingsProps = {
  isPaginationEnabled: boolean
  isFilterEnabled: boolean
  setIsPaginationEnabled: (v: boolean) => void
  setIsFilterEnabled: (v: boolean) => void
}

const ListSettings = ({
  isPaginationEnabled,
  isFilterEnabled,
  setIsPaginationEnabled,
  setIsFilterEnabled,
}: ListSettingsProps) => {
  const updatePagination = () => {
    setIsPaginationEnabled(!isPaginationEnabled)
  }
  const updateFilter = () => {
    setIsFilterEnabled(!isFilterEnabled)
  }
  return (
    <>
      Settings:
      <Button
        sizing="md"
        variant="primary"
        mb={3}
        active={isPaginationEnabled}
        onClick={updatePagination}
      >
        {isPaginationEnabled ? 'Pagination enabled' : 'Pagination disabled'}
      </Button>
      <Button
        active={isFilterEnabled}
        sizing="md"
        variant="primary"
        onClick={updateFilter}
      >
        {isFilterEnabled ? 'Filter enabled' : 'Filter disabled'}
      </Button>
    </>
  )
}

export const MainPage = () => {
  const [currentOption, setCurrentOption] = useState<SelectOptionType>(
    SELECT_OPTIONS[0]
  )
  const [isPaginationEnabled, setIsPaginationEnabled] = useState<boolean>(true)
  const [isFilterEnabled, setIsFilterEnabled] = useState<boolean>(false)
  const [filterString, setFilterString] = useState<string>('')

  const handlePaginationSelect = (value: SelectOptionType | null) => {
    value && setCurrentOption(value)
  }

  const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterString(e.target.value)
  }

  return (
    <Flex justifyContent="center" height="100vh" bg="container">
      <Flex bg="content" borderRadius={10} width={800} p={3} my={25}>
        <Flex flexDirection="column" width="20%" mr={4}>
          <ListSettings
            isPaginationEnabled={isPaginationEnabled}
            isFilterEnabled={isFilterEnabled}
            setIsPaginationEnabled={setIsPaginationEnabled}
            setIsFilterEnabled={setIsFilterEnabled}
          />
        </Flex>
        <Flex flexDirection="column" width="80%">
          <Controls
            isPaginationEnabled={isPaginationEnabled}
            isFilterEnabled={isFilterEnabled}
            handlePaginationSelect={handlePaginationSelect}
            handleFilterInput={handleFilterInput}
            filterString={filterString}
            currentOption={currentOption}
          />
          <List
            data={FAKE_DATA}
            visibleItems={currentOption.value}
            filterString={filterString}
            paginated={isPaginationEnabled}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
