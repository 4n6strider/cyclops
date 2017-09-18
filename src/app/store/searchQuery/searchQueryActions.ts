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

// Local
import {
  ReduxAction,
  ThunkActionPromise,
} from '~/store/types';
import { StoreState } from '~/store';
import { search } from '~/services/search/utils/searchAPI';
import {
  CombinedSearchResults,
  SearchEndpoint,
  SearchQuery,
} from '~/services/search/types';
import { addError } from '~/store/errorModal';

/**
 * Determines if a promise is still valid based on the given promiseID.
 * @param {symbol} promiseID
 * @param {StoreState} state
 * @returns {boolean}
 */
function isValidPromise(promiseID: symbol, state: StoreState): boolean {
  return true;
}

const ACTION_PREFIX = 'SEARCH_QUERY';

export enum SearchQueryView {
  Alerts,
  Data,
}

// -- FETCH_RESULTS_PENDING --
// Request for alerts and data matching a search query was successful.

export const FETCH_RESULTS_PENDING = `${ACTION_PREFIX}/FETCH_RESULTS_PENDING`;
export type FetchResultsPendingAction = ReduxAction<{
  query: string;
  promiseID: symbol;
}>;
export function fetchResultsPending(
  query: string,
  promiseID: symbol,
): FetchResultsPendingAction {
  return { type: FETCH_RESULTS_PENDING, payload: { query, promiseID } };
}

// -- FETCH_RESULTS_SUCCESS --
// Request for alerts and data matching a search query was successful.

export const FETCH_RESULTS_SUCCESS = `${ACTION_PREFIX}/FETCH_RESULTS_SUCCESS`;
export type FetchResultsSuccessAction = (
  ReduxAction<SearchEndpoint<CombinedSearchResults>>
);
export function fetchResultsSuccess(
  results: SearchEndpoint<CombinedSearchResults>,
): FetchResultsSuccessAction {
  return { type: FETCH_RESULTS_SUCCESS, payload: results };
}

// -- FETCH_RESULTS_FAILED --
// Request for alerts and data matching a search query has failed.

export const FETCH_RESULTS_FAILED = `${ACTION_PREFIX}/FETCH_RESULTS_FAILED`;
export type FetchResultsFailedAction = ReduxAction<SearchQuery>;
export function fetchResultsFailed(
  query: SearchQuery,
): FetchResultsFailedAction {
  return { type: FETCH_RESULTS_FAILED, payload: query };
}

// -- CHANGE_VIEW --
// User requests for the data view to change.

export const CHANGE_VIEW = `${ACTION_PREFIX}/CHANGE_VIEW`;
export type ChangeViewAction = ReduxAction<SearchQueryView>;
export function changeView(view: SearchQueryView): ChangeViewAction {
  return { type: CHANGE_VIEW, payload: view };
}

/**
 * Retrieves alerts and data matching the search query.
 * @param {string} query
 * @returns {ThunkActionPromise}
 */
export function fetchResults(query: string): ThunkActionPromise {
  return (dispatch, getState) => {
    const promiseID = Symbol();

    dispatch(fetchResultsPending(query, promiseID));

    return search(query)
      .then((results) => {
        if (!isValidPromise(promiseID, getState())) { return; }

        dispatch(fetchResultsSuccess(results));
      })
      .catch((error) => {
        if (
          isValidPromise(promiseID, getState()) &&
          error.response.status === 400 &&
          error.response.data.query
        ) {
          dispatch(fetchResultsFailed(error.response.data.query));
        } else {
          dispatch(addError(error));
        }
      });
  };
}
