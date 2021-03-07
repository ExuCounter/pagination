import { Flex } from 'shared/Flex'

export type ListItemProps = {
  title: string
}

export const ListItem = ({ title }: ListItemProps) => {
  return (
    <Flex bordered p={2}>
      {title}
    </Flex>
  )
}
