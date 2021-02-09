import * as React from 'react'
import * as ReactDom from 'react-dom'
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane'
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base'

import * as strings from 'RenameInstallationWebPartStrings'
import RenameInstallation from './components/RenameInstallation'
import AppContext from './components/AppContext'

export interface IRenameInstallationWebPartProps {
  description: string
}

// TODO: rewrite to function (no prio; only if time permits)
// @K: functions kunnen niet makkelijk extenden (kan maar syntax is niet zo nice) ik zou het gewoon laten
// https://www.digitalocean.com/community/tutorials/five-ways-to-convert-react-class-components-to-functional-components-with-react-hooks
// https://stackoverflow.com/questions/59487504/how-to-rewrite-a-react-class-that-extends-another-class-as-a-functional-componen
export default class RenameInstallationWebPart extends BaseClientSideWebPart<IRenameInstallationWebPartProps> {
  public render(): void {
    // @K: JSX.Element
    const element: JSX.Element = React.createElement(
      AppContext.Provider,
      { value: this.context },
      React.createElement(RenameInstallation, {
        description: this.properties.description,
      })
    )

    ReactDom.render(element, this.domElement)
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement)
  }

  // TODO: is this still needed? (Came out of the box this way)
  // protected get dataVersion(): Version {
  //   return Version.parse("1.0")
  // }

  // @K: lijkt static, kan misscien buiten component
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    }
  }
}
