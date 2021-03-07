import { ListItem, ListItemProps } from './ListItem'
import { useState, useMemo, useEffect } from 'react'
import { ValueType } from 'react-select'
import { Controls, VisibleItemsOptionType } from './Controls'
import { Button } from 'shared/Button'
import { Flex } from 'shared/Flex'
import { Box } from 'shared/Box'
import { Text } from 'shared/Text'

const INITIAL_PAGE_NUMBER = 1

type ListProps = {
  data: ListItemProps[]
  visibleItems: number
}

export const List = ({ data: list, visibleItems }: ListProps) => {
  const [pageNumber, setPageNumber] = useState<number>(INITIAL_PAGE_NUMBER)
  const options: VisibleItemsOptionType[] = new Array(visibleItems)
    .fill(0)
    .map((_, idx) => ({ value: idx + 1, label: `${idx + 1}` }))
  const [currentOption, setCurrentOption] = useState<
    ValueType<VisibleItemsOptionType, false>
  >(options[0])

  const [filterString, setFilterString] = useState<string>('')

  const handleSelect = (value: ValueType<VisibleItemsOptionType, false>) => {
    setCurrentOption(value)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterString(e.target.value)
  }

  const {
    isPreviousPageAvailable,
    isNextPageAvailable,
    filteredList,
    visibleItemsNumber,
  } = useMemo(() => {
    const visibleItemsNumber = currentOption?.value || 1
    const filteredList = filterString
      ? list.filter((item) => item.title.includes(filterString))
      : list
    const availablePagesNumber = Math.ceil(
      filteredList.length / visibleItemsNumber
    )
    const isPreviousPageAvailable = pageNumber - 1 > 0
    const isNextPageAvailable = pageNumber + 1 <= availablePagesNumber

    return {
      isPreviousPageAvailable,
      isNextPageAvailable,
      filteredList,
      visibleItemsNumber,
    }
  }, [pageNumber, list, filterString, currentOption])

  useEffect(() => {
    setPageNumber(INITIAL_PAGE_NUMBER)
  }, [visibleItemsNumber])

  const visibleList = useMemo(
    () =>
      filteredList.filter((_, idx) => {
        const viewedItemsNumber = pageNumber * visibleItemsNumber

        if (pageNumber === 1) {
          return idx < visibleItemsNumber
        } else {
          return (
            idx >= viewedItemsNumber - visibleItemsNumber &&
            idx < viewedItemsNumber
          )
        }
      }),
    [pageNumber, visibleItemsNumber, list, filteredList]
  )

  const goToPreviousPage = () => {
    isPreviousPageAvailable && setPageNumber(pageNumber - 1)
  }

  const goToNextPage = () => {
    isNextPageAvailable && setPageNumber(pageNumber + 1)
  }

  return (
    <Box p={4}>
      <Controls
        handleInput={handleInput}
        handleSelect={handleSelect}
        selectOptions={options}
      />
      {visibleList.map((item, idx) => {
        return <ListItem key={idx} {...item} />
      })}
      <Text className="page-number">Page number {pageNumber}</Text>
      <Flex width={200} justifyContent="space-around">
        <Button disabled={!isPreviousPageAvailable} onClick={goToPreviousPage}>
          {'<'}
        </Button>
        <Button disabled={!isNextPageAvailable} onClick={goToNextPage}>
          {'>'}
        </Button>
      </Flex>
    </Box>
  )
}
