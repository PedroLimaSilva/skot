import React from 'react';
import { connect } from 'react-redux';

import { getFile } from '../../store/selectors';
import { StatementBlock } from '../statement-block';

import { CodeBlock } from '../CodeBlock';

class File extends CodeBlock {
  render() {
    return (
      <section className='File'>
        <StatementBlock
          statements={this.props.statements}
          path={this.state.path}
        />
      </section>
    );
  }
}

export default connect((state) => getFile(state))(File);
