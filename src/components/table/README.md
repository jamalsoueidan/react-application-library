# Table

This is optimized table list, which only renderer what is visible, and reuse the data that are already rendered.

[Demo Codepen](http://codepen.io/jamalsoueidan/pen/peqyRb?editors=0110)

![](https://github.com/jamalsoueidan/react-application-library/blob/master/src/components/table/screenshot.png?raw=true)

## Examples

```js
const data = [];
for(var i=0; i<100; i++) {
  data.push({id: i, name: "jamal " + i})
}

const rowRenderer = (rowHeight) => (item) => (
  <tr key={item.id} style={{height: `${rowHeight}px`}}><td>{item.name}</td></tr>
)

export default () => (
  <Table data={data} rowRenderer={rowRenderer} perPage={30} />
)
```

## Features

- Validates columns and data columns is same!
- Customize so it works with API calls while scrolling!
- ...