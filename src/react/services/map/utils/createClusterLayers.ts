/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the "Agreement”). You
 * may not use this file except in compliance with the Agreement, a copy
 * of which may be found at https://github.com/dunbarcyber/cyclops/. The
 * developer of the CYPHON technology and platform is Dunbar Security
 * Systems, Inc.
 *
 * The CYPHON technology or platform are distributed under the Agreement on
 * an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the Agreement for specific terms.
 *
 * Copyright (C) 2017 Dunbar Security Solutions, Inc. All Rights Reserved.
 *
 * Contributor/Change Made By: ________________. [Only apply if changes
 * are made]
 */

// Vendor
import { Layer, SymbolLayout } from 'mapbox-gl';

// Local
import { CLUSTER_LAYERS } from '../constants';
import { ClusterLayer } from '../types';

/**
 * Creates a collection of cluster layers for the given mapbox source.
 * @param sourceId Unique identifier of the source.
 * @returns {mapboxgl.Layer[]}
 */
export function createClusterLayers(sourceId: string): Layer[] {
  const layers: Layer[] = [];

  CLUSTER_LAYERS.forEach((layer: ClusterLayer, index: number) => {
    layers.push({
      id: sourceId + '-cluster-' + index,
      type: 'circle',
      source: sourceId,
      paint: {
        'circle-color': layer.color,
        'circle-radius': 18,
      },
      filter: index === 0 ?
        ['>=', 'point_count', layer.markerMinimum] :
        [
          'all',
          ['>=', 'point_count', layer.markerMinimum],
          ['<', 'point_count', (<ClusterLayer[]> CLUSTER_LAYERS)[index - 1].markerMinimum],
        ],
    });
  });

  const layout: SymbolLayout = {
    'text-field': '{point_count}',
    'text-size': 12,
  };

  layers.push({
    id: sourceId + '-cluster-count',
    layout,
    source: sourceId,
    type: 'symbol',
  });

  return layers;
}