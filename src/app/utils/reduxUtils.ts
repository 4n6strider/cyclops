/*!
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
  ReducerMap,
  ReduxAction,
  ReduxActionCreator,
} from '~/types/redux';
import { Reducer } from 'redux';

/**
 * Creates a flux standard action with the given payload type.
 * @param type Action type.
 * @param payload Data to attach to the action.
 * @param error If the action is an error.
 * @returns {ReduxAction<Payload>}
 */
export function createAction<Payload>(
  type: string,
  payload: Payload,
): ReduxAction<Payload> {
  return { type, payload };
}

export function createReducer<S>(
  initial: S,
  reducers: ReducerMap<S>,
): Reducer<S> {
  return (state = initial, action) => {
    const handler = reducers[action.type];

    if (handler) { return handler(state, action); }

    return state;
  };
}

export function updateState<S>(state: S, update: Partial<S>) {
  return Object.assign({}, state, update);
}
