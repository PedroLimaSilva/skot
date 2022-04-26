import { Input } from '../Input';

/**
 * TO DO use this in return statements, if, right side of attributions, either side of *+-/
 */
export class Expression extends Input {
  handleInput = (e) => {
    const value = e.target.value;
    console.log('Expression', value);

    
  };
}
