import AppController from '../controller/appController';
import AppView from '../view/appView';
import { IProduct } from '../types/types';

class App {
  private controller: AppController;
  private appView: AppView;

  constructor() {
    this.controller = new AppController();
    this.appView = new AppView();
  }

  public start(): void {
    console.log('start');
    this.controller.getProducts((data: IProduct[]): void => this.appView.drawProducts(data));
  }
}

export default App;
