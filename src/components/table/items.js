import React from 'react'
import { findDOMNode } from 'react-dom'

export default class Items extends React.Component {
  get data() {
    const { perPage, scrollPercent, data} = this.props;

    const dataLength = data.length
    let from = scrollPercent/100 * dataLength;
    let to = from + perPage;

    if(to >= dataLength) {
      from = dataLength - perPage;
      to = dataLength;
    }

    return data.slice(from, to)
  }

  get style() {
    const { rowPosition, rowHeight, perPage, tableHeight, data } = this.props;
    const length = data.length - perPage;
    const percent = (rowPosition / length * 100);
    const top = (percent / 100) * ((rowHeight * (perPage+1)) - tableHeight)
    return { top: `-${top}px` }
  }

  get items() {
    const { rowRenderer, columns, selected, rowHeight } = this.props;
    return this.data.map(item => (
      <div key={item.id} className="item" style={{ height: `${rowHeight}px` }}>
        { rowRenderer(item, {type: 'item', selected, columns}) }
      </div>
    ));
  }

  render() {
    return(
      <div className="table-list-items" style={this.style}>
        {this.items}
      </div>
    )
  }
}