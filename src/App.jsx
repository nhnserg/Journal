import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvidev } from './context/user.context';
import { useState } from 'react';


function App() {
	const [items, setItems] = useLocalStorage('data');
	const [selectedItem, setSelectedItem] = useState(null);
	console.log('App');

	const addItem = item => {
		const mapItems = items => {
			return items ? items.map(i => ({ ...i, date: new Date(i.date) })) : [];
		};

		const mappedItems = mapItems(items);

		if (!item.id) {
			const newId = mappedItems.length > 0 ? Math.max(...mappedItems.map(i => i.id)) + 1 : 1;
			setItems([...mappedItems, { ...item, date: new Date(item.date), id: newId }]);
		} else {
			setItems([...mappedItems.map(i => (i.id === item.id ? { ...item } : i))]);
		}
	};

	const deleteItem = (id) => {
		setItems([...items.filter(i => i.id !== id)]);
	};

	return (
		<UserContextProvidev>
			<div className='app'>
				<LeftPanel>
					<Header />
					<JournalAddButton clearForm={() => setSelectedItem(null)} />
					<JournalList items={mapItems(items)} setItem={setSelectedItem} />
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addItem} onDelete={deleteItem} data={selectedItem} />
				</Body>
			</div>
		</UserContextProvidev>
	);
}

export default App;