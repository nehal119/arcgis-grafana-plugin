import React, { useEffect, useRef } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import {
  stylesFactory,
  // useTheme
} from '@grafana/ui';

import { loadModules } from 'esri-loader';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  // const theme = useTheme();
  const styles = getStyles();
  const mapRef = useRef(null);
  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/widgets/Search'], { css: true }).then(
      ([ArcGISMap, MapView, Search]) => {
        const map = new ArcGISMap({
          basemap: options.mapType,
        });

        // load the map view at the ref's DOM node
        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [77, 28],
          zoom: 8,
        });
        // Search widget
        var search = new Search({
          view: view,
        });

        view.ui.add(search, 'top-right');

        return () => {
          if (view) {
            // destroy the map view
            view.container = null;
          }
        };
      }
    );
  }, [options.mapType]);
  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div style={{ width: width, height: height }} ref={mapRef} />
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
