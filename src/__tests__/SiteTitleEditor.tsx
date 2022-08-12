import * as React from 'react'
// import {render, screen} from '@testing-library/react'
import { render } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import SiteTitleEditor from '../webparts/renameInstallation/components/SiteTitleEditor'
import AppContext from '../webparts/renameInstallation/components/AppContext'


test('add a proper name for this test', () => {
  render(
    <AppContext.Provider value={} >
      <SiteTitleEditor />
    </AppContext.Provider>
  )
  // screen.debug()
  // userEvent.type(screen.getByRole('textbox', {name: /name/i}), 'bob')
  // expect(screen.getByText(/hello.*bob/i)).toBeInTheDocument()
  expect(1).toBe(1)
})
