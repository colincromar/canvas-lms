/*
 * Copyright (C) 2018 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import {arrayOf, bool, shape, string} from 'prop-types'
import React from 'react'
import I18n from 'i18n!assignments'
import FinalGraderSelectMenu from './FinalGraderSelectMenu'
import ModeratedGradingCheckbox from './ModeratedGradingCheckbox'
import {direction} from '../shared/helpers/rtlHelper'

export default class ModeratedGradingFormFieldGroup extends React.Component {
  static propTypes = {
    availableModerators: arrayOf(shape({name: string.isRequired, id: string.isRequired})).isRequired,
    finalGraderID: string,
    moderatedGradingEnabled: bool.isRequired
  }

  static defaultProps = {
    finalGraderID: null
  }

  constructor(props) {
    super(props)
    this.handleModeratedGradingChange = this.handleModeratedGradingChange.bind(this)
    this.state = {
      moderatedGradingChecked: props.moderatedGradingEnabled
    }
  }

  handleModeratedGradingChange(moderatedGradingChecked) {
    this.setState({moderatedGradingChecked})
  }

  render() {
    return (
      <fieldset>
        <div className={`form-column-${direction('left')}`}>{I18n.t('Moderated Grading')}</div>
        <div className="ModeratedGrading__Container">
          <div className="border border-trbl border-round">
            <ModeratedGradingCheckbox
              checked={this.state.moderatedGradingChecked}
              onChange={this.handleModeratedGradingChange}
            />

            {this.state.moderatedGradingChecked && (
              <div className="ModeratedGrading__Content">
                <FinalGraderSelectMenu
                  availableModerators={this.props.availableModerators}
                  finalGraderID={this.props.finalGraderID}
                />
              </div>
            )}
          </div>
        </div>
      </fieldset>
    )
  }
}
