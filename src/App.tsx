import { useState, useRef, useEffect } from 'react';
import { Item, IItem } from './Item';
import ItemList from './ItemList';
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'shoppingListApp__local_storage'

function App() {
  const [items, setItems] = useState<IItem[]>(() => {
    {
      const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY)
      return storedItems ? JSON.parse(storedItems) : []
    }
  })
  const itemProductRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function togglePurchased(key: string) {
    const newItems = [...items]
    const item = newItems.find(item => item.key === key)
    if (item) {
      item.purchased = !item.purchased
      setItems(newItems)
    } else {
      // throw exception - id should have existed
    }
  }

  function handleAddItem(e:React.SyntheticEvent) {
    e.preventDefault()
    const name = itemProductRef.current?.value;
    if (!name || name == '') {
      return;
    }
    setItems(previousItems => {
      return [...previousItems, 
        { key: uuidv4(), product: name, purchased: false } as IItem
      ]
    })
    if (itemProductRef.current?.value) {
      itemProductRef.current.value = '';
    }
  }

  function handleClearComplete() {
    setItems(items.filter(item => !item.purchased))
  }

  return (
    <div id="root">
      <ItemList items={items} togglePurchased={togglePurchased} />
      <form onSubmit={handleAddItem}>
        <input ref={itemProductRef} type="text"/>
        <button onClick={handleAddItem}>Add Item</button>
        <button onClick={handleClearComplete}>Remove Purchased</button>
        <div>{items.filter(item => !item.purchased).length} remaining</div>
      </form>
    </div>
  );
}

export default App;
