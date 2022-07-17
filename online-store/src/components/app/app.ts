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
    this.controller.initControls(
      this.appView.getControls(),
      (data: IProduct[]): void => this.appView.drawProducts(data),
      // (data: ISettings): void => this.appView.drawControls(data),
      (): void => this.start()
    );
    this.appView.drawProducts(this.controller.getProducts());
  }
}

export default App;
