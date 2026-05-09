type SidebarItemProps = {
  name: string
  active: boolean
  onClick: () => void
}

export default function SidebarItem({ name, active, onClick }: SidebarItemProps) {
  return (
    <button
      type="button"
      className={`sidebar-item ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {name}
    </button>
  )
}