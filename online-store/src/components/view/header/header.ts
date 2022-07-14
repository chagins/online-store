import { ISettings } from '../../types/types';
import './header.scss';

class Header {
  private container: HTMLDivElement | null;

  constructor() {
    this.container = document.querySelector('.content');
  }

  public draw(settings: ISettings): void {
    if (this.container) this.container.innerHTML = '';

    const contentHeader: HTMLDivElement = document.createElement('div');
    contentHeader.classList.add('content-header');

    const inputSort: HTMLSelectElement = document.createElement('select');
    inputSort.classList.add('input-sort');

    for (const field of settings.sort.fieldTypes) {
      for (const order of settings.sort.orderTypes) {
        const option: HTMLOptionElement = document.createElement('option');
        option.classList.add('option-sort');
        option.value = `${field}:${order}`;
        option.innerText = `${field} ${order}`;
        inputSort.appendChild(option);
      }
    }

    inputSort.value = `${settings.sort.fieldCurrent}:${settings.sort.orderCurrent}`;

    contentHeader?.appendChild(inputSort);
    this.container?.prepend(contentHeader);
  }
}

export default Header;
