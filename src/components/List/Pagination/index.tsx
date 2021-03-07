import { Flex } from 'components/shared/Flex'
import { Circle } from 'components/shared/Circle'
import { Button } from 'components/shared/Button'

export type ListPaginationProps = {
  isPreviousPageAvailable: boolean
  isNextPageAvailable: boolean
  previousPageButtonText: string
  nextPageButtonText: string
  nextPageButtonHandler: () => void
  previousPageButtonHandler: () => void
  currentPageNumber: number
}

export const ListPagination = ({
  isPreviousPageAvailable,
  previousPageButtonHandler,
  nextPageButtonHandler,
  isNextPageAvailable,
  nextPageButtonText,
  previousPageButtonText,
  currentPageNumber,
}: ListPaginationProps) => {
  return (
    <Flex width={200} justifyContent="center" mx="auto" mt={3}>
      <Button
        disabled={!isPreviousPageAvailable}
        onClick={previousPageButtonHandler}
      >
        {previousPageButtonText}
      </Button>
      <Flex mx={3}>
        Current Page:
        <Circle sizing="xs" borderRadius="50%">
          {currentPageNumber}
        </Circle>
      </Flex>
      <Button disabled={!isNextPageAvailable} onClick={nextPageButtonHandler}>
        {nextPageButtonText}
      </Button>
    </Flex>
  )
}
