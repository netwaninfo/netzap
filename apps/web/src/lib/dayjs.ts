import 'dayjs/locale/pt-br'

import _dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import localizedFormat from 'dayjs/plugin/localizedFormat'

_dayjs.extend(calendar)
_dayjs.extend(localizedFormat)

_dayjs.locale('pt-br')

const dayjs = _dayjs

export { dayjs }
