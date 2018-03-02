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
import { Action } from '~/store/types';
import { TagWithTopic } from '~/services/tags/types';

// FETCH_TAGS_PENDING
// --------------------------------------------------------------------------

export const FETCH_TAGS_PENDING = 'TAG_STORE:FETCH_TAGS_PENDING';
export type FetchTagsPendingAction = Action<typeof FETCH_TAGS_PENDING, undefined>;
export const fetchTagsPending = (): FetchTagsPendingAction => ({
  type: FETCH_TAGS_PENDING,
  payload: undefined,
});

// FETCH_TAGS_SUCCESS
// --------------------------------------------------------------------------

export const FETCH_TAGS_SUCCESS = 'TAG_STORE:FETCH_TAGS_SUCCESS';
export type FetchTagsSuccessAction = Action<typeof FETCH_TAGS_SUCCESS, TagWithTopic[]>;
export const fetchTagsSuccess = (tags: TagWithTopic[]): FetchTagsSuccessAction => ({
  type: FETCH_TAGS_SUCCESS,
  payload: tags,
});

// FETCH_TAGS_FAILURE
// --------------------------------------------------------------------------

export const FETCH_TAGS_FAILURE = 'TAG_STORE:FETCH_TAGS_FAILURE';
export type FetchTagsFailureAction = Action<typeof FETCH_TAGS_FAILURE, undefined>;
export const fetchTagsFailure = (): FetchTagsFailureAction => ({
  type: FETCH_TAGS_FAILURE,
  payload: undefined,
});


