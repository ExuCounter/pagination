import { ListItem, ListItemProps } from './ListItem'
import { PropsWithChildren, useState, useMemo, useEffect } from 'react'
import './style.css'

const INITIAL_PAGE_NUMBER = 1

type ListProps = {
  data: ListItemProps[]
  visibleItemsNumber: number
  filterByTitle?: string
}

type ListPaginationArrowProps = {
  content: string
  disabled: boolean
  onClick: () => void
}

type ListPaginationArrowsContainerProps = PropsWithChildren<{}>

export const ListPaginationArrowsContainer = ({
  children,
}: ListPaginationArrowsContainerProps) => (
  <div className="pagination-list-arrows">{children}</div>
)

export const ListPaginationArrow = ({
  content,
  disabled,
  onClick,
}: ListPaginationArrowProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="pagination-list-arrow"
    >
      {content}
    </button>
  )
}

export const List = ({
  data: list,
  filterByTitle,
  visibleItemsNumber,
}: ListProps) => {
  const [pageNumber, setPageNumber] = useState<number>(INITIAL_PAGE_NUMBER)

  const {
    isPreviousPageAvailable,
    isNextPageAvailable,
    filteredList,
  } = useMemo(() => {
    const filteredList = filterByTitle
      ? list.filter((item) => item.title.includes(filterByTitle))
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
    }
  }, [pageNumber, visibleItemsNumber, list, filterByTitle])

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
    <div className="list-container">
      {visibleList.map((item, idx) => {
        return <ListItem key={idx} {...item} />
      })}
      <p className="page-number">Page number {pageNumber}</p>
      <ListPaginationArrowsContainer>
        <ListPaginationArrow
          disabled={!isPreviousPageAvailable}
          content={'<'}
          onClick={goToPreviousPage}
        />
        <ListPaginationArrow
          disabled={!isNextPageAvailable}
          content={'>'}
          onClick={goToNextPage}
        />
      </ListPaginationArrowsContainer>
    </div>
  )
}
