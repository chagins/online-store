import AppController from '../controller/appController';
import AppView from '../view/appView';
import Loader from '../controller/loader';
import { IProduct } from '../types/types';

class App {
  private controller: AppController;
  private appView: AppView;

  constructor() {
    this.controller = new AppController(Loader);
    this.appView = new AppView();
  }

  public start(): void {
    this.controller.getProducts((data: IProduct[]): void => this.appView.drawProducts(data));
  }
}

export default App;
