import { List } from '../List'

const VISIBLE_ITEMS_NUMBER = 2

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

export const MainPage = () => {
  return <List visibleItemsNumber={VISIBLE_ITEMS_NUMBER} data={fakeData} />
}
