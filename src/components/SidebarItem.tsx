type SidebarItemProps = {
  name: string
  active: boolean
  onClick: () => void
  disabled: boolean
}

export default function SidebarItem({ name, active, onClick, disabled }: SidebarItemProps) {
  return (
    <button
      type="button"
      className={`sidebar-item ${active ? 'active' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  )
}