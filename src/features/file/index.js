import React from 'react';
import { connect } from 'react-redux';

import { getFile } from '../../store/selectors';
import { StatementBlock } from '../statement-block';

class File extends React.Component {
  render() {
    return (
      <section className='File'>
        <StatementBlock statements={this.props.statements} />
      </section>
    );
  }
}

export default connect((state) => getFile(state))(File);
