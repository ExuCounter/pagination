import './style.css'

export type ListItemProps = {
  title: string
}

export const ListItem = ({ title }: ListItemProps) => {
  return <div className="list-item">{title}</div>
}
