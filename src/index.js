import 'index.scss'
import 'styles/nav.scss'
import 'script-loader!TimelineJS3/compiled/js/timeline.js'
import timeline from './timeline'
import navToggle from 'nav'
import "styles/reset.scss"

window.timeline = timeline // eslint-disable-line no-undef
window.navToggle = navToggle // eslint-disable-line no-undef
