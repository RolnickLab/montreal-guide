import classNames from 'classnames'
import styles from './Menu.module.css'
import { NavLink } from 'react-router-dom'

const MENU_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Submit', to: '/submit' },
]

export const Menu = () => {
  return (
    <nav>
      <ul className={styles.menuItems}>
        {MENU_ITEMS.map((menuItem, index) => (
          <li key={index}>
            <NavLink
              className={({ isActive }) =>
                classNames('text-base font-bold', styles.menuItem, {
                  [styles.active]: isActive,
                })
              }
              to={menuItem.to}
            >
              {menuItem.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
