import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return (
    builder
      // .addTextInput({
      //   path: 'text',
      //   name: 'Simple text option',
      //   description: 'Description of panel option',
      //   defaultValue: 'Default value of text input option',
      // })
      // .addBooleanSwitch({
      //   path: 'showSeriesCount',
      //   name: 'Show series counter',
      //   defaultValue: false,
      // })
      .addSelect({
        path: 'mapType',
        defaultValue: 'osm',
        name: 'Map View Type',
        settings: {
          options: [
            { value: 'topo', label: 'topo' },
            { value: 'streets', label: 'streets' },
            { value: 'satellite', label: 'satellite' },
            { value: 'hybrid', label: 'hybrid' },
            { value: 'dark-gray', label: 'dark-gray' },
            { value: 'gray', label: 'gray' },
            { value: 'national-geographic', label: 'national-geographic' },
            { value: 'oceans', label: 'oceans' },
            { value: 'osm', label: 'osm' },
            { value: 'terrain', label: 'terrain' },
            { value: 'dark-gray-vector', label: 'dark-gray-vector' },
            { value: 'gray-vector', label: 'gray-vector' },
            { value: 'streets-vector', label: 'streets-vector' },
            { value: 'streets-night-vector', label: 'streets-night-vector' },
            { value: 'streets-navigation-vector', label: 'streets-navigation-vector' },
            { value: 'topo-vector', label: 'topo-vector' },
            { value: 'streets-relief-vector', label: 'streets-relief-vector' },
          ],
        },
        // showIf: config => config.showSeriesCount,
      })
  );
});
