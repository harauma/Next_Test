import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage } from 'next-page-tester'
import { initTestHelpers } from 'next-page-tester'

initTestHelpers()

// process.env.NEXT_PUBLIC_RESTAPI_URL = 'http://127.0.0.1:8000/api'

describe('Navigation by Link', () => {
  it('Should route to selected page in navber', async () => {
    const { page } = await getPage({
      route: '/blog-page',
    })
    render(page)

    // userEvent.click(screen.getByTestId('blog-nav'))
    expect(await screen.findByText('blog page')).toBeInTheDocument()
    // screen.debug()
    userEvent.click(screen.getByTestId('comment-nav'))
    expect(await screen.findByText('comment page')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('context-nav'))
    expect(await screen.findByText('context page')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('task-nav'))
    expect(await screen.findByText('todos page')).toBeInTheDocument()
    // userEvent.click(screen.getByTestId('home-nav'))
    // expect(await screen.findByText('new blog page')).toBeInTheDocument()
  })
})
