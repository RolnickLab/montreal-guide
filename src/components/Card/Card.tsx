import { ExternalLinkIcon, PersonIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { Tables } from '../../utils/supabase/types'
import { Spacer } from '../Spacer/Spacer'
import styles from './Card.module.css'

interface CardProps {
  tip: Tables<'tips'>
  categories: Tables<'categories'>[]
}

export const Card = ({ tip, categories }: CardProps) => {
  const category = categories.find((category) => category.id === tip.category)

  return (
    <div className={styles.wrapper}>
      {tip.image_url ? (
        <img className={styles.image} src={tip.image_url} alt="" />
      ) : (
        <PlaceholderImage categoryId={category?.id} />
      )}
      <div className={styles.content}>
        <div className={classNames('text-sm font-bold', styles.category)}>
          {category?.label ?? 'Other'}
        </div>
        <Spacer size={12} />
        <h3 className="text-md font-bold">{tip.title}</h3>
        <Spacer size={12} />
        <p className={classNames('text-sm', styles.createdBy)}>
          <PersonIcon />
          <span>{tip.created_by}</span>
        </p>
        <Spacer size={32} />
        <p className="text-base">
          <i>"{tip.description}"</i>
        </p>
        <Spacer size={32} expand />
        <div className={classNames('text-base, font-bold', styles.links)}>
          {tip.website_url && <Link label="Website" href={tip.website_url} />}
          {tip.google_maps_url && (
            <Link label="Google Maps" href={tip.google_maps_url} />
          )}
        </div>
      </div>
    </div>
  )
}

const PlaceholderImage = ({ categoryId }: { categoryId?: number }) => {
  const imageMap: { [key: number]: string } = {
    1: '/shopping-bag.png',
    2: '/rolling-pin.png',
    3: '/hiking.png',
    4: '/wine-tasting.png',
    5: '/pot.png',
    6: '/painting.png',
  }

  const image = categoryId && imageMap[categoryId]

  return (
    <div className={styles.placeholderImageContainer}>
      {image && <img className={styles.placeholderImage} src={image} alt="" />}
    </div>
  )
}

const Link = ({ label, href }: { label: string; href: string }) => {
  return (
    <a href={href} className={styles.link}>
      <span>{label}</span>
      <ExternalLinkIcon />
    </a>
  )
}
