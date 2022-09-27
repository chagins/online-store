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
    this.appView.drawControls(AppController.getSettings());
    this.appView.drawProducts(this.controller.getProducts());
    this.controller.initControls({
      controls: this.appView.getControls(),
      productsDrawCallback: (data: IProduct[]): void => this.appView.drawProducts(data),
      restartCallback: (): void => this.start(),
    });
    this.controller.initCards({
      cards: this.appView.getProductCards(),
      productCardDrawCallback: (data: IProduct): void => this.appView.drawProductCard(data),
      controls: this.appView.getControls(),
    });
  }
}

export default App;
