import moment from 'moment'
const today = new moment()

export default [
	{
		start: moment([2015, 6, 16]),
		end: moment([2016, 11, 9]),
		content: '2016 Presidential Campaign',
		type: 'range',
		style: 'background-color: #151f6d; color: white;',
		group: 'eras',
		selectable: false,
	},
	{
		start: moment([2016, 11, 9]),
		end: moment([2017, 1, 20]),
		content: 'Transition Period',
		type: 'range',
		style: 'background-color: #3a3a3a; color: white;',
		group: 'eras',
		selectable: false,
	},
	{
		start: moment([2017, 1, 20]),
		end: moment(),
		content: 'Trump Administration',
		type: 'range',
		style: 'background-color: #be202e; color: white;',
		group: 'eras',
		selectable: false,
	}
]
