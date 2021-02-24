import * as React from 'react'
import {render, screen} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import SiteTitleEditor from '../webparts/renameInstallation/components/SiteTitleEditor'

test('typing a name shows a greeting', () => {
  render(<SiteTitleEditor />)
  screen.debug()
  // userEvent.type(screen.getByRole('textbox', {name: /name/i}), 'bob')
  // expect(screen.getByText(/hello.*bob/i)).toBeInTheDocument()
})
