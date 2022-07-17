import { filteringField, ISettings, rangingField, sliderUI } from '../../types/types';
import noUiSlider, { API } from 'nouislider';
import wNumb from 'wnumb';

import './filter.scss';

class Filter {
  private container: HTMLDivElement | null;
  public sliders?: sliderUI[];

  constructor() {
    this.container = document.querySelector('.side-panel');
    this.sliders = [];
  }

  public draw(settings: ISettings): void {
    if (this.container) this.container.innerHTML = '';

    // draw filters
    for (const filter in settings.filter) {
      const filterElement: HTMLSelectElement = document.createElement('select');
      filterElement.classList.add('filter');
      filterElement.id = `${filter}`;
      filterElement.title = `${filter}`;
      filterElement.dataset.option = `select ${filter}`;
      this.container?.appendChild(filterElement);

      const filterName = filter as filteringField;
      for (const filterValue of settings.filter[filterName].types) {
        const option: HTMLOptionElement = document.createElement('option');
        option.classList.add('option-filter');
        option.value = filterValue;
        option.innerText = filterValue;
        filterElement.appendChild(option);
      }
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

      this?.sliders?.push({ sliderId: range, sliderInstance: slider });
      rangeContainer?.appendChild(rangeElement);
      this.container?.appendChild(rangeContainer);
    }

    // draw reset button
    const filterBtn: HTMLButtonElement = document.createElement('button');
    filterBtn.classList.add('filter-btn');
    filterBtn.innerText = 'apply filters';
    this.container?.appendChild(filterBtn);

    // draw reset button
    const resetBtn: HTMLButtonElement = document.createElement('button');
    resetBtn.classList.add('reset-btn');
    resetBtn.innerText = 'reset filters';
    this.container?.appendChild(resetBtn);
  }
}

export default Filter;
