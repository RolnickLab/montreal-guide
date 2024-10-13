import classNames from 'classnames'
import styles from './Menu.module.css'

const MENU_ITEMS = [{ label: 'Home' }, { label: 'Submit' }]

export const Menu = () => {
  return (
    <nav>
      <ul className={styles.menuItems}>
        {MENU_ITEMS.map((menuItem, index) => (
          <li
            key={index}
            className={classNames('text-base font-bold', styles.menuItem, {
              [styles.active]: index === 0,
            })}
          >
            {menuItem.label}
          </li>
        ))}
      </ul>
    </nav>
  )
}
