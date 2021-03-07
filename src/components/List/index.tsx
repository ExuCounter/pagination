import { ListItem, ListItemProps } from './ListItem'
import { useState, useMemo, useEffect } from 'react'
import { Box } from 'components/shared/Box'
import { ListPagination } from 'components/List/Pagination'

const INITIAL_PAGE_NUMBER = 1

type ListProps = {
  data: ListItemProps[]
  visibleItems?: number
  filterString?: string
  nextPageButtonText?: string
  previousPageButtonText?: string
  paginated?: boolean
}

export const List = ({
  data: list,
  visibleItems = 5,
  filterString,
  nextPageButtonText = '>',
  previousPageButtonText = '<',
  paginated,
}: ListProps) => {
  const [pageNumber, setPageNumber] = useState<number>(INITIAL_PAGE_NUMBER)

  const {
    isPreviousPageAvailable,
    isNextPageAvailable,
    filteredList,
  } = useMemo(() => {
    const filteredList = filterString
      ? list.filter((item) => item.title.includes(filterString))
      : list
    const availablePagesNumber = Math.ceil(filteredList.length / visibleItems)
    const isPreviousPageAvailable = pageNumber - 1 > 0
    const isNextPageAvailable = pageNumber + 1 <= availablePagesNumber

    return {
      isPreviousPageAvailable,
      isNextPageAvailable,
      filteredList,
    }
  }, [pageNumber, list, filterString, visibleItems])

  useEffect(() => {
    setPageNumber(INITIAL_PAGE_NUMBER)
  }, [visibleItems])

  const visibleList = useMemo(
    () =>
      filteredList.filter((_, idx) => {
        const viewedItemsNumber = pageNumber * visibleItems

        if (pageNumber === 1) {
          return idx < visibleItems
        } else {
          return (
            idx >= viewedItemsNumber - visibleItems && idx < viewedItemsNumber
          )
        }
      }),
    [pageNumber, visibleItems, filteredList]
  )

  const goToPreviousPage = () => {
    isPreviousPageAvailable && setPageNumber(pageNumber - 1)
  }

  const goToNextPage = () => {
    isNextPageAvailable && setPageNumber(pageNumber + 1)
  }

  return (
    <Box>
      {paginated && (
        <>
          {visibleList.map((item, idx) => (
            <ListItem key={idx} {...item} />
          ))}
          <ListPagination
            nextPageButtonText={nextPageButtonText}
            previousPageButtonText={previousPageButtonText}
            isPreviousPageAvailable={isPreviousPageAvailable}
            isNextPageAvailable={isNextPageAvailable}
            previousPageButtonHandler={goToPreviousPage}
            nextPageButtonHandler={goToNextPage}
            currentPageNumber={pageNumber}
          />
        </>
      )}
      {!paginated && list.map((item, idx) => <ListItem key={idx} {...item} />)}
    </Box>
  )
}
