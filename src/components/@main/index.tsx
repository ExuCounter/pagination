import React, { useState } from 'react'
import { List } from 'components/List'
import { Select } from 'components/shared/Select'
import { Input } from 'components/shared/Input'
import { Button } from 'components/shared/Button'
import { Text } from 'components/shared/Text'
import { Flex } from 'components/shared/Flex'
import { FAKE_LIST_DATA } from 'data/fakeData'

type SelectOptionType = {
  value: number
  label: string
}

const SELECT_OPTIONS = new Array(3)
  .fill(0)
  .map((_, idx) => ({ value: idx + 3, label: `${idx + 3}` }))

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
    <Flex mt={3} flexDirection="column">
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
  setFilterString: (str: string) => void
}

const ListSettings = ({
  isPaginationEnabled,
  isFilterEnabled,
  setIsPaginationEnabled,
  setIsFilterEnabled,
  setFilterString,
}: ListSettingsProps) => {
  const updatePagination = () => {
    setIsPaginationEnabled(!isPaginationEnabled)
  }
  const updateFilter = () => {
    setIsFilterEnabled(!isFilterEnabled)
    clearFilterString()
  }
  const clearFilterString = () => {
    setFilterString('')
  }
  return (
    <>
      <Text fontSize={16} mb={3}>
        Settings:
      </Text>
      <Button
        sizing="md"
        variant="primary"
        mb={2}
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
  const [isPaginationEnabled, setIsPaginationEnabled] = useState<boolean>(false)
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
            setFilterString={setFilterString}
          />
          <Controls
            isPaginationEnabled={isPaginationEnabled}
            isFilterEnabled={isFilterEnabled}
            handlePaginationSelect={handlePaginationSelect}
            handleFilterInput={handleFilterInput}
            filterString={filterString}
            currentOption={currentOption}
          />
        </Flex>
        <Flex flexDirection="column" width="80%">
          <Text mb="2" fontSize="20px">
            List
          </Text>
          <List
            data={FAKE_LIST_DATA}
            visibleItems={currentOption.value}
            filterString={filterString}
            paginated={isPaginationEnabled}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
