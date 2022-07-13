import { callbackFun, ILoader } from '../types/types';

class Loader implements ILoader {
  public load<T>(data: T, drawCallback: callbackFun<T>): void {
    drawCallback(data);
  }
}

export default Loader;
