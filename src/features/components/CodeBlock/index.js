import React from 'react';

export class CodeBlock extends React.PureComponent {
  state = {
    path: [],
  };

  componentDidMount() {
    this.updatePath();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.path !== this.props.path ||
      prevProps.stateKeys !== this.props.stateKeys
    ) {
      this.updatePath();
    }
  }

  updatePath() {
    this.setState({
      path: [...(this.props.path || []), ...this.props.stateKeys],
    });
  }
}
