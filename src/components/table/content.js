import React from 'react'
import { findDOMNode } from 'react-dom'

export default class Content extends React.Component {
  constructor(props) {
    super(props)
    this.data = props.data;
    this.state = {sort: {}}
  }

  /* This method is called when "select" props is set */
  scrollToSelected() {
    const { selected, rowIndexToScrollPosition, rowHeight } = this.props
    if(!selected) return;
    const keys = Object.keys(selected);
    const index = this.data.findIndex((item) => keys.every(key => selected[key] === item[key]))
    rowIndexToScrollPosition(index)
  }

  sort(callback) {
    this.setState({sort: callback});
  }

  get tbody() {
    const { rowPosition, rowHeight, fakeRowHeight, rowRenderer, perPage, selected } = this.props;
    const style = {height: `${rowHeight}px`, lineHeight: `${rowHeight}px`};

    if(this.data.length===0) {
      return rowRenderer(null, {
        type: 'thead', style
      })
    }

    const data = this.data;
    let from = Math.ceil( rowPosition );
    let to = perPage+from;
    if(to>=data.length) {
      from = data.length - perPage;
      to = data.length;
    }

    return data.slice(from, to).map(item => rowRenderer(item, {type: 'tbody', style, selected}));
  }

  get thead() {
    const { columns, rowRenderer, rowHeight } = this.props;
    if(!columns) return;
    return rowRenderer(columns, {type: 'thead', rowHeight, sort: this.sort.bind(this)})
  }

  render() {
    return(
      <div className="content">
        <table>
          <thead>
            {this.thead}
          </thead>
          <tbody>
            {this.tbody}
          </tbody>
        </table>
      </div>
    )
  }

  componentDidMount() {
    this.scrollToSelected()
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.sort !== this.state.sort) {
      const sort = nextState.sort
      this.data.sort(sort);
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.selected!==this.props.selected) {
      this.scrollToSelected()
    }
  }
}
