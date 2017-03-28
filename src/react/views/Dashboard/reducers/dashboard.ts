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
import { ReducerMap, handleActions } from 'redux-actions';
import { Canceler } from 'axios';

// Local
import * as actions from '../actions/dashboard';
import {
  PieChartDataWithColor,
  StackedAreaChartDataWithColor,
} from '../../../services/chart/types';
import { AlertLocationResponse } from '../../../api/alerts/types';

/**
 * State shape of the Dashboard reducer.
 */
export interface State {
  days: number;
  total: number;
  levelDistributionLoading: boolean;
  levelDistributionData: PieChartDataWithColor[];
  statusDistributionLoading: boolean;
  statusDistributionData: PieChartDataWithColor[];
  collectionDistributionLoading: boolean;
  collectionDistributionData: PieChartDataWithColor[];
  levelTimeseriesLoading: boolean;
  levelTimeseriesData: StackedAreaChartDataWithColor[];
  locations: AlertLocationResponse | null;
  locationsLoading: boolean;
  locationFeatureCount: number;
}

/**
 * Initial state of the Dashboard reducer.
 * @type {State}
 */
const INITIAL_STATE: State = {
  days: 1,
  total: 0,
  levelDistributionLoading: false,
  levelDistributionData: [],
  statusDistributionLoading: false,
  statusDistributionData: [],
  collectionDistributionLoading: false,
  collectionDistributionData: [],
  levelTimeseriesLoading: false,
  levelTimeseriesData: [],
  locations: null,
  locationsLoading: false,
  locationFeatureCount: 0,
};

/**
 * Object used to map reducer functions to action types modifying the
 * Dashboard reducer state.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<State, any> = {};

/**
 * Function that cancels a pending request.
 */
let requestCanceler: Canceler;

/**
 * Cancels a pending request related to the Dashboard view and replaces
 * the requestCanceler function with a new one.
 * @param canceler Function that cancels a request.
 */
function cancelRequest(canceler?: Canceler): void {
  if (requestCanceler) { requestCanceler(); }
  if (canceler) { requestCanceler = canceler; }
}

/**
 * Updates the Dashboard reducer based on a(n) FETCH_DATA_PENDING action.
 * @param state Current Dashboard reducer state.
 * @param action FETCH_DATA_PENDING action.
 * @returns {State} Updated Dashboard reducer state.
 */
reducers[actions.FETCH_DATA_PENDING] = (
  state: State,
  action: actions.FetchDataPendingAction,
): State => {
  const update: Partial<State> = {
    collectionDistributionLoading: true,
    days: action.payload.days,
    levelDistributionLoading: true,
    levelTimeseriesLoading: true,
    locationsLoading: true,
    statusDistributionLoading: true,
  };

  // Cancel any current requests.
  cancelRequest(action.payload.canceler);

  return Object.assign({}, state, update);
};

/**
 * Updates the Dashboard reducer based on a(n)
 * FETCH_DISTRIBUTION_DATA_SUCCESS action.
 * @param state Current Dashboard reducer state.
 * @param action FETCH_DISTRIBUTION_DATA_SUCCESS action.
 * @returns {State} Updated Dashboard reducer state.
 */
reducers[actions.FETCH_DISTRIBUTION_DATA_SUCCESS] = (
  state: State,
  action: actions.FetchDistributionDataSuccessAction,
): State => {
  const update: Partial<State> = {
    [`${action.payload.type}DistributionData`]: action.payload.data,
    [`${action.payload.type}DistributionLoading`]: false,
    total: action.payload.total,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the Dashboard reducer based on a(n)
 * FETCH_TIMESERIES_DATA_SUCCESS action.
 * @param state Current Dashboard reducer state.
 * @param action FETCH_TIMESERIES_DATA_SUCCESS action.
 * @returns {State} Updated Dashboard reducer state.
 */
reducers[actions.FETCH_TIMSERIES_DATA_SUCCESS] = (
  state: State,
  action: actions.FetchTimeseriesDataSuccessAction,
): State => {
  const update: Partial<State> = {
    levelTimeseriesData: action.payload,
    levelTimeseriesLoading: false,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the Dashboard reducer based on a(n) FETCH_LOCATION_DATA_SUCCESS action.
 * @param state Current Dashboard reducer state.
 * @param action FETCH_LOCATION_DATA_SUCCESS action.
 * @returns {State} Updated Dashboard reducer state.
 */
reducers[actions.FETCH_LOCATION_DATA_SUCCESS] = (
  state: State,
  action: actions.FetchLocationDataSuccessAction,
): State => {
  const update: Partial<State> = {
    locationFeatureCount: action.payload.features.length,
    locations: action.payload,
    locationsLoading: false,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the Dashboard reducer based on a(n) FETCH_DATA_FAILURE action.
 * @param state Current Dashboard reducer state.
 * @param action FETCH_DATA_FAILURE action.
 * @returns {State} Updated Dashboard reducer state.
 */
reducers[actions.FETCH_DATA_FAILURE] = (
  state: State,
  action: actions.FetchDataFailureAction,
): State => {
  const update: Partial<State> = {
    // Sets loading to false for the failed widget.
    [`${action.payload}Loading`]: false,
  };

  return Object.assign({}, state, update);
};

/**
 * Dashboard reducer.
 * @type {Reducer<State, any>}
 */
export const reducer = handleActions<State, any>(reducers, INITIAL_STATE);
