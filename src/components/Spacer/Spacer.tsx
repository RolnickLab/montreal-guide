import styles from './Spacer.module.css'

interface SpacerProps {
  size: number
  expand?: boolean
}

export const Spacer = ({ size, expand }: SpacerProps) => {
  return (
    <div
      className={styles.spacer}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        flexGrow: expand ? '1' : undefined,
      }}
    />
  )
}
