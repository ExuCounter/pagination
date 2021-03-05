import { ListItem, ListItemProps } from './ListItem'
import { PropsWithChildren, useState, useMemo, useEffect } from 'react'
import './style.css'

const INITIAL_PAGE_NUMBER = 1

type ListProps = {
  data: ListItemProps[]
  visibleItemsNumber: number
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

export const List = ({ data: list, visibleItemsNumber }: ListProps) => {
  const [pageNumber, setPageNumber] = useState<number>(INITIAL_PAGE_NUMBER)

  const { isPreviousPageAvailable, isNextPageAvailable } = useMemo(() => {
    const availablePagesNumber = Math.ceil(list.length / visibleItemsNumber)
    const isPreviousPageAvailable = pageNumber - 1 > 0
    const isNextPageAvailable = pageNumber + 1 <= availablePagesNumber

    return {
      isPreviousPageAvailable,
      isNextPageAvailable,
    }
  }, [pageNumber, visibleItemsNumber, list])

  useEffect(() => {
    setPageNumber(INITIAL_PAGE_NUMBER)
  }, [visibleItemsNumber])

  const visibleList = useMemo(
    () =>
      list.filter((_, idx) => {
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
    [pageNumber, visibleItemsNumber, list]
  )

  const goToPreviousPage = () => {
    isPreviousPageAvailable && setPageNumber(pageNumber - 1)
  }

  const goToNextPage = () => {
    isNextPageAvailable && setPageNumber(pageNumber + 1)
  }

  return (
    <>
      {visibleList.map((item, idx) => {
        return <ListItem key={idx} {...item} />
      })}
      <>
        <p>Page number {pageNumber}</p>
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
      </>
    </>
  )
}
