import { filteringField, IControls, ISettings, rangingField } from '../../types/types';
import noUiSlider, { API } from 'nouislider';
import wNumb from 'wnumb';

import './filter.scss';

class Filter {
  private container: HTMLDivElement | null;

  constructor() {
    this.container = document.querySelector('.side-panel');
  }

  public draw(settings: ISettings, controls: IControls): void {
    if (this.container) this.container.innerHTML = '';

    // draw filters
    for (const filter in settings.filter) {
      const filterElement: HTMLSelectElement = document.createElement('select');
      filterElement.classList.add('filter');
      filterElement.id = `${filter}`;
      filterElement.title = `${filter}`;
      filterElement.dataset.option = `select ${filter}`;

      const filterName = filter as filteringField;
      for (const filterValue of settings.filter[filterName].types) {
        const option: HTMLOptionElement = document.createElement('option');
        option.classList.add('option-filter');
        option.value = filterValue;
        option.innerText = filterValue;
        filterElement.appendChild(option);
      }
      controls.filter[filterName] = filterElement;
      this.container?.appendChild(filterElement);
    }

    // draw ranges
    for (const range in settings.range) {
      const rangeContainer: HTMLDivElement = document.createElement('div');
      rangeContainer.classList.add('range-container');

      const rangeLabel: HTMLParagraphElement = document.createElement('p');
      rangeLabel.classList.add('range-label');
      rangeLabel.innerText = range;
      rangeContainer.appendChild(rangeLabel);

      const rangeElement: HTMLDivElement = document.createElement('div');
      rangeElement.classList.add('range');
      rangeElement.id = `${range}`;
      const rangeName = range as rangingField;
      const min = settings.range[rangeName].min as number;
      const max = settings.range[rangeName].max as number;
      const currentMin = settings.range[rangeName].current[0] as number;
      const currentMax = settings.range[rangeName].current[1] as number;
      const rangeStep = settings.range[rangeName].format.step;

      const slider: API = noUiSlider.create(rangeElement, {
        start: [currentMin, currentMax],
        connect: true,
        range: {
          min: min,
          max: max,
        },
        step: rangeStep,
        tooltips: true,
        format: wNumb({
          decimals: settings.range[rangeName].format.decimals,
        }),
      });

      controls.range[rangeName] = slider;
      rangeContainer?.appendChild(rangeElement);
      this.container?.appendChild(rangeContainer);
    }

    // draw reset button
    const resetBtn: HTMLButtonElement = document.createElement('button');
    resetBtn.classList.add('reset-btn');
    resetBtn.innerText = 'reset filters';
    controls.resetBtn = resetBtn;
    this.container?.appendChild(resetBtn);

    // draw clear button
    const clearBtn: HTMLButtonElement = document.createElement('button');
    clearBtn.classList.add('clear-btn');
    clearBtn.innerText = 'clear settings';
    controls.clearBtn = clearBtn;
    this.container?.appendChild(clearBtn);

    // draw arrow up button
    const arrowUplnk: HTMLAnchorElement = document.createElement('a');
    arrowUplnk.classList.add('arrowup-lnk');
    arrowUplnk.title = 'Go up';
    arrowUplnk.href = '#top';
    this.container?.appendChild(arrowUplnk);
  }
}

export default Filter;
