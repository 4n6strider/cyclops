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
import * as React from 'react';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDetailOutcomeRemove component. */
interface Props {
  /** Cancels removing the alert outcome. */
  close(): any;
  /** Removes the alert outcome. */
  remove(): void;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a button that removes the current outcome for an alert.
 */
export class AlertDetailOutcomeRemove extends React.Component<Props, {}> {
  public render() {
    return (
      <div>
        <div className="well">
          <p className="well__content">
            Are you sure you want to remove the current outcome?
            The outcome description will be removed and the alert
            status will be set back to busy.
          </p>
        </div>

        <div className="btn-group btn-group-justified">
          <div className="btn-group">
            <button className="btn btn-default" onClick={this.props.remove}>
              Remove
            </button>
          </div>
          <div className="btn-group">
            <button className="btn btn-danger" onClick={this.props.close}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}