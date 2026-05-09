export default function SidebarItem({ name, active, handleClick, index }) {

    return (
        <button
            type='button'
            className={`sidebar-item ${active ? 'active' : ''}`}
            onClick={() => handleClick(index)}
        >
            {name}
        </button>
    );
}