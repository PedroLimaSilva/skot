import { Component } from "react";
import { Expression } from ".";

export class BinaryExpression extends Component {
  render() {
    const { content } = this.props;
    return <Expression content={content} />;
  }
}

