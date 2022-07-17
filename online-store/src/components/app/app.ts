import AppController from '../controller/appController';
import AppView from '../view/appView';
import AppSettings from '../controller/appSettings';
import { IProduct } from '../types/types';

class App {
  private controller: AppController;
  private appView: AppView;

  constructor() {
    this.controller = new AppController(AppSettings);
    this.appView = new AppView();
  }

  public start(): void {
    this.appView.drawControls(this.controller.getSettings());
    this.appView.drawProducts(this.controller.getProducts());
    this.controller.initControls(
      this.appView.getControls(),
      (data: IProduct[]): void => this.appView.drawProducts(data),
      (): void => this.start()
    );
    this.controller.initCards(
      this.appView.getProductCards(),
      (data: IProduct): void => this.appView.drawProductCard(data),
      this.appView.getControls()
    );
  }
}

export default App;
