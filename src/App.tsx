import React from 'react';
import './App.css';
import { LayerTree, LayerTreeItem } from './components/LayerTree';

function App() {
  const lista = ['a', 'b', 'c'];

  const itemLevelClickHandler = (value: string, item: unknown) => {
    console.log(`LayerTreeItem click: ${value}`, item);

    // Do not call tree level handler
    return true;
  };

  const handleItemClick = (value: string, item: unknown) => {
    console.log(`LayerTree click: ${value}`, item);
  };

  return (
    <div className="App">
      <h1>CSS + SVG TreeControl</h1>
      <div style={{ border: 'solid 1px red', maxWidth: '300px', padding: '10px' }}>
        <LayerTree onItemClick={handleItemClick}>
          <LayerTreeItem value="Level1" color="#44AA44" disabled={false} data={{ name: 'Arto', age: 44, alive: true }} onClick={itemLevelClickHandler}>
            <LayerTreeItem icon="diamond" color="#6666FF" value="Level 1.1" selected iconGroup={1}>
              <LayerTreeItem icon="square" color="#6666FF" value="Level 1.1.1" selected={false} iconGroup={1} />
              <LayerTreeItem icon="square" color="#6666FF" value="Level 1.1.2" selected={false} iconGroup={1} />
            </LayerTreeItem>
            <LayerTreeItem icon="diamond" color="#CC3333" value="Level 1.2" disabled={true} iconGroup={1}></LayerTreeItem>
          </LayerTreeItem>
          <LayerTreeItem value="Level2" iconGroup={7} color="#AA4444" />
          <LayerTreeItem value="Level3" icon="diamond" disabled>
            <LayerTreeItem color="#FF4444" value="Level 3.1" icon="diamond" iconGroup={0} />
            <LayerTreeItem value="Level 3.2" />
          </LayerTreeItem>
        </LayerTree>
      </div>
      <hr />
      <LayerTree>
        <LayerTreeItem value="Single node" />
      </LayerTree>
      <hr />
      <LayerTree>
        <LayerTreeItem value="Root one" />
        <LayerTreeItem value="Root two" />
      </LayerTree>
      <hr />
      <LayerTree allowCollapse={false}>
        <LayerTreeItem value="Single root">
          <LayerTreeItem value="Child 1" />
          <LayerTreeItem value="Child 2" />
          <LayerTreeItem value="Child 3" />
        </LayerTreeItem>
      </LayerTree>
      <hr />
      Dynamic tree:
      <LayerTree>
        {lista.map((item) => (
          <LayerTreeItem key={item} value={item} onClick={itemLevelClickHandler} />
        ))}
      </LayerTree>
    </div>
  );
}

export default App;
