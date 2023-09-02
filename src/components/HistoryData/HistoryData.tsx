import { useAppSelector } from "../../app/hooks"
import { ImpressionLog } from "../../reducers/HistoryLog"
import { getCurrentTime } from "../../utils/calculations"

const HistoryData = () => {
  const historyLog = useAppSelector<ImpressionLog[]>(
    state => state.historyLog.historyLog
  )

  return (
    <ul className="impressionHistory">
    {[...historyLog]
      .filter(cat => cat.type === 'Favourites')
      .sort((b, a) => new Date(a.time).getTime() - new Date(b.time).getTime())
      .map(action => {
        const { id, time, type, status } = action
        return (
          <li
            key={action.id}
            className="impressionHistory-item impressionHistory-item--fav-page"
          >
            <span className="impressionHistory-time">
              {getCurrentTime(time)}
            </span>
            <span className="impressionHistory-text">
              {' Image ID: '}
            </span>
            <span className="impressionHistory-id">{id}</span>
            <span className="impressionHistory-text">{` was ${
              status === 'added' ? 'added to' : 'removed from'
            } Favourites`}</span>
          </li>
        )
      })}
  </ul>
  )
}

export default HistoryData
