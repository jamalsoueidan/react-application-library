import React from 'react'
import { Dropdown, DropdownManager } from 'components/dropdown'

const LinkControl = class extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      visible: false
    }
  }

  onClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    let isVisible = this.state.visible
    let { dropdown, link } = this.refs
    if(isVisible) {
      dropdown.hide();
    } else {
      dropdown.show(link);
    }

    this.setState({visible: !isVisible})
  }

  render() {
    const {columns} = this.props;
    return(
      <div className="filter">
        <div ref="link" className="link" onClick={this.onClick.bind(this)}>
        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNjEuNTYgNjEuNTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYxLjU2IDYxLjU2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPGc+DQoJCQk8Zz4NCgkJCQk8Zz4NCgkJCQkJPHBvbHlnb24gcG9pbnRzPSIyNy45NDcsNTcuNzggMjMuOTQ3LDU3Ljc4IDIzLjk0NywzNi40MzQgMCwzLjc4IDUxLjk0NywzLjc4IDUxLjk0Nyw3Ljc4IDcuODk0LDcuNzggMjcuOTQ3LDM1LjEyNSAJCQkJCSIvPg0KCQkJCTwvZz4NCgkJCTwvZz4NCgkJCTxnPg0KCQkJCTxnPg0KCQkJCQk8cG9seWdvbiBwb2ludHM9IjM5Ljk0Nyw1Ny43OCAzNS45NDcsNTcuNzggMzUuOTQ3LDM1LjEyNSA1OC4zMzQsNC41OTcgNjEuNTYsNi45NjIgMzkuOTQ3LDM2LjQzNCAJCQkJCSIvPg0KCQkJCTwvZz4NCgkJCTwvZz4NCgkJPC9nPg0KCQk8Zz4NCgkJCTxnPg0KCQkJCTxyZWN0IHg9IjEzLjk0NyIgeT0iMTcuNzgiIHdpZHRoPSIzNiIgaGVpZ2h0PSI0Ii8+DQoJCQk8L2c+DQoJCTwvZz4NCgkJPGc+DQoJCQk8Zz4NCgkJCQk8cmVjdCB4PSIxOC45NDciIHk9IjI0Ljc4IiB3aWR0aD0iMjYiIGhlaWdodD0iNCIvPg0KCQkJPC9nPg0KCQk8L2c+DQoJCTxnPg0KCQkJPGc+DQoJCQkJPHJlY3QgeD0iOC45NDciIHk9IjEwLjc4IiB3aWR0aD0iNDciIGhlaWdodD0iNCIvPg0KCQkJPC9nPg0KCQk8L2c+DQoJPC9nPg0KCTxnPg0KCTwvZz4NCgk8Zz4NCgk8L2c+DQoJPGc+DQoJPC9nPg0KCTxnPg0KCTwvZz4NCgk8Zz4NCgk8L2c+DQoJPGc+DQoJPC9nPg0KCTxnPg0KCTwvZz4NCgk8Zz4NCgk8L2c+DQoJPGc+DQoJPC9nPg0KCTxnPg0KCTwvZz4NCgk8Zz4NCgk8L2c+DQoJPGc+DQoJPC9nPg0KCTxnPg0KCTwvZz4NCgk8Zz4NCgk8L2c+DQoJPGc+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" width="100%" height="100%" />
        </div>
        <Dropdown ref="dropdown">
        {columns.map(c=> {
          return(<div key={c.attribute}><label htmlFor={c.attribute}><input id={c.attribute} type="checkbox" name={c.attribute} onChange={() => c.visibility = !c.visibility} checked={(c.visibility ? "checked" : "")}/>{c.displayName}</label></div>)
        })}
        </Dropdown>
      </div>
    )
  }
}

export default LinkControl
