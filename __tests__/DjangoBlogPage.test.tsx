import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { getPage } from 'next-page-tester'
import { initTestHelpers } from 'next-page-tester'

initTestHelpers()

process.env.NEXT_PUBLIC_RESTAPI_URL = 'http://127.0.0.1:8000/api'

const server = setupServer(
  rest.get(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/get-blogs/`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            title: 'title1',
            content: 'content1',
            username: 'username1',
            tags: [
              { id: 1, name: 'tag1' },
              { id: 2, name: 'tag2' },
            ],
            created_at: '2022-08-31 13:14:30',
          },
          {
            id: 2,
            title: 'title2',
            content: 'content2',
            username: 'username2',
            tags: [
              { id: 1, name: 'tag1' },
              { id: 2, name: 'tag2' },
            ],
            created_at: '2022-09-01 03:14:30',
          },
        ])
      )
    }
  )
)

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
  cleanup()
  document.cookie =
    'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
})

afterAll(() => {
  server.close()
})

describe('DjangoBlogPage Test Cases', () => {
  it('Should route to admin page and route back to blog page', async () => {
    const { page } = await getPage({
      route: '/',
    })
    render(page)
    userEvent.click(screen.getByTestId('admin-nav'))
    expect(await screen.findByText('Login')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('django-blog-nav'))
    expect(await screen.findByText('django blog page')).toBeInTheDocument()
  })

  it('Should render delete btn + logout btn when JWT token cookie exist', async () => {
    document.cookie = 'access_token=123xyz'
    const { page } = await getPage({
      route: '/',
    })
    render(page)
    expect(await screen.findByText('django blog page')).toBeInTheDocument()
    expect(screen.getByTestId('logout-icon')).toBeInTheDocument()
    expect(screen.getByTestId('btn-1')).toBeInTheDocument()
    expect(screen.getByTestId('btn-2')).toBeInTheDocument()
  })

  it('Should not render delete btn + logout btn when no cookie', async () => {
    const { page } = await getPage({
      route: '/',
    })
    render(page)
    expect(await screen.findByText('django blog page')).toBeInTheDocument()
    expect(screen.queryByTestId('logout-icon')).toBeNull()
    expect(screen.queryByTestId('btn-1')).toBeNull()
    expect(screen.queryByTestId('btn-2')).toBeNull()
  })

  it('Should render the list of blogs pre-featched by getStaticProps', async () => {
    const { page } = await getPage({
      route: '/',
    })
    render(page)
    expect(await screen.findByText('django blog page')).toBeInTheDocument()
    expect(screen.getByText('title1')).toBeInTheDocument()
    expect(screen.getByText('title2')).toBeInTheDocument()
  })
})