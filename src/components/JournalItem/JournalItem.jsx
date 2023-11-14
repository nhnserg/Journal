import './JournalItem.css';

function JournalItem({ title, post, date }) {
	const formattedDate = new Intl.DateTimeFormat('ru-RU').format(date);

	return (
		<div className="journal-item">
			<div className="journal-item__header">{title}</div>
			<div className="journal-item__body">
				<div className="journal-item__date">{formattedDate}</div>
				<p className="journal-item__text">{post}</p>
			</div>
		</div>
	);
}

export default JournalItem;