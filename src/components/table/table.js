import React from 'react'
import Scroll from './scroll'
import Content from './content'
import { findDOMNode } from 'react-dom'

require('./stylesheet.css')

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPosition: 0,
      wheelDirection: null,
      rowHeight: null
    }

    this.onScrollPosition = this.onScrollPosition.bind(this)
    this.onMouseWheel = this.onMouseWheel.bind(this)
    this.onResize = this.onResize.bind(this)
  }

  onMouseWheel(wheelDirection) {
    this.setState({wheelDirection})
  }

  get perPage() {
    const { perPage, columns } = this.props
    if(columns) return perPage + 1; // if we have thead then +1 perPage
    return perPage;
  }

  get dataLength() {
    const { data, columns } = this.props
    if(columns) return data.length + 1; // if we have thead then +1 perPage
    return data.length;
  }

  calculateRowHeight() {
    const node = findDOMNode(this);
    const rowHeight = (node.offsetHeight / this.perPage)
    // TODO: Fix this issue with rowHeight becoming 13.4 with 400px as example!
    const checkMistake = (rowHeight + "").split(".")
    if(checkMistake[1] && checkMistake[1] !== "5") {
      console.error(`${rowHeight} is not acceptable in css, please change height of the table, it must be .5 and not .1, .2, .3 etc.`)
      console.error("You can actually figure out what the best height for table, by saying 11 rows x 10 perPage = 440pixel")
    }
    this.setState({rowHeight})
  }

  onResize() {
    this.calculateRowHeight();
  }

  onScrollPosition(scrollPosition) {
    this.setState({scrollPosition})
  }

  renderContent(rowHeight) {
    const {data, rowRenderer, perPage, selected, columns} = this.props;
    const {scrollPosition} = this.state;

    return(
      <Content
        columns={columns}
        scrollPosition={scrollPosition}
        onMouseWheel={this.onMouseWheel}
        onScrollPosition={this.onScrollPosition}
        data={data}
        rowRenderer={rowRenderer}
        rowHeight={rowHeight}
        selected={selected}
        perPage={perPage} />
    )
  }

  renderScroll(rowHeight) {
    const page = this.props.page;
    const {wheelDirection, scrollPosition} = this.state;

    return(
      <Scroll
        scrollPosition={scrollPosition}
        wheelDirection={wheelDirection}
        perPage={this.perPage}
        onScrollPosition={this.onScrollPosition}
        dataLength={this.dataLength}
        page={page}
        rowHeight={rowHeight} />
    )
  }

  render() {
    const { rowHeight } = this.state

    return(
      <div className="table">
        {rowHeight && this.renderContent(rowHeight) }
        {rowHeight && this.renderScroll(rowHeight) }
      </div>
    )
  }

  componentDidMount() {
    this.calculateRowHeight();
    window.addEventListener("resize", this.onResize);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.wheelDirection!==this.state.wheelDirection) {
      this.setState({wheelDirection: null})
    }

    if(prevProps.perPage!=this.props.perPage) {
      this.calculateRowHeight();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }
}