import styles from './Spacer.module.css'

interface SpacerProps {
  size: number
}

export const Spacer = ({ size }: SpacerProps) => {
  return (
    <div
      className={styles.spacer}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  )
}
