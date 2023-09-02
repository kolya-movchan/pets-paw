import classNames from 'classnames'
import { Link } from 'react-router-dom'

type Props = {
  to: string
  iconSrc: string
  text: string
}

export const CustomLink: React.FC<Props> = ({ to, iconSrc, text }) => {
  return (
    <Link
      to={to}
      target="_blank"
      className={classNames('contacts__link ', {
      })}
    >
      <img
        src={iconSrc}
        alt={`${text} icon`}
        className={classNames('icon-dash', {
        })}
      />
    </Link>
  )
}
