import { callbackFun } from '../types/types';

class Loader {
  protected load<T>(data: T, drawCallback: callbackFun<T>): void {
    drawCallback(data);
  }
}

export default Loader;
