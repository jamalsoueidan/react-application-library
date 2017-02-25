import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import Area from './area'
import Axis from './axis'
import Data from './data'
import { Current, LastYear, Text, Average, Standby, Cooling } from './overlays'

require('./stylesheet.css')

class SVG extends React.Component {
  constructor(props) {
    super(props)
    this.onResize = this.onResize.bind(this)
    this.state = {
      width: props.width,
      height: props.height,
      ticks: 30
    }
    this.data = new Data(props.data)
  }

  onResize() {
    let { width, height } = ReactDOM.findDOMNode(this).getBoundingClientRect()
    let ticks = 30;
    if(width < 1000) ticks = 15
    if(width < 500)  ticks = 8
    if(width < 250)  ticks = 5
    this.setState({ width, height, ticks })
  }

  componentDidMount() {
    this.onResize();
    // maybe manager to handle all at once instead every SVG handle itself?
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    let { className, width, height } = this.props
    return(
      <svg width={width} height={height} className={"svg " + className}>
        {this.renderArea()}
      </svg>
    )
  }

  renderArea() {
    let { width, height, ticks } = this.state

    // wait until we calculate width and height
    if(width === "100%" ) return null;

    let { margins } = this.props
    let area = {
      height: height - margins.top - margins.bottom,
      width: width - margins.left - margins.right
    }

    let scaleX = d3.scaleLinear().range([0, area.width]).domain([0, this.data.consumption.top]).nice();
    let scaleY = d3.scaleBand().range([area.height, 0]).domain(this.data.consumption.bars.map(function(d) { return d._label; })).padding(0.1)

    let overLayAttributes = {
      data: this.data,
      scaleX: scaleX,
      scaleY: scaleY,
      area: area
    }

    let { hideText, hideLastYear, hideAverage, hideStandby, hideAxisX, hideAxisY } = this.props

    return(
      <Area top={margins.top} right={margins.right} bottom={margins.bottom} left={margins.left}>
        <Axis scale={scaleX} orient="bottom" transform={"translate(0," + area.height + ")"} ticks={ticks} hide={hideAxisX}/>
        <Axis scale={scaleY} orient="left" hide={hideAxisY}/>
        <Current {...overLayAttributes} />
        <Cooling hide={hideLastYear} {...overLayAttributes} />
        <LastYear hide={hideLastYear} {...overLayAttributes} />
        <Standby hide={hideStandby} min={this.min} {...overLayAttributes} />
        <Average hide={hideAverage} {...overLayAttributes} />
        <Text hide={hideText} {...overLayAttributes} />
      </Area>
    )
  }
}

SVG.propTypes = {
  responsive: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  margins: PropTypes.object,
  className: PropTypes.string,
  hideAverage: PropTypes.bool,
  hideText: PropTypes.bool,
  hideLastYear: PropTypes.bool,
  hideStandby: PropTypes.bool,
  hideAxisX: PropTypes.bool,
  hideAxisY: PropTypes.bool,
  data: PropTypes.object.isRequired
}

SVG.defaultProps = {
  width: "100%",
  height: "100%",
  margins: {
    left: 40,
    right: 20,
    top: 20,
    bottom: 20
  },
  className: "svg",
  hideAverage: true,
  hideText: true,
  hideLastYear: true,
  hideStandby: true,
  hideAxisX: false,
  hideAxisY: false,
  responsive: true
}

export default SVG
