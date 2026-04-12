import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom'
import type { ReactElement } from 'react'

type CustomRenderOptions = RenderOptions & {
  routerProps?: MemoryRouterProps
}

function customRender(ui: ReactElement, options: CustomRenderOptions = {}) {
  const { routerProps, ...renderOptions } = options
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter {...routerProps}>{children}</MemoryRouter>
    ),
    ...renderOptions,
  })
}

export { customRender as render }
export { screen, within, waitFor } from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
