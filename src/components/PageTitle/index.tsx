import styles from './styles.module.css'

interface IPageTitle {
  title: string
}

export default function PageTitle({ title }: IPageTitle) {
  return (
    <span className={styles.container}>{title}</span>
  )
}
