import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../pages/index'

it('Should render hello text', () => {
  // render(<Home />)
  // expect(screen.getByText('Welcome to Nextjs')).toBeInTheDocument()
})

// initTestHelpers()

// process.env.NEXT_PUBLIC_RESTAPI_URL = 'http://127.0.0.1:8000/api'

// const server = setupServer(
//   rest.get(
//     `${process.env.NEXT_PUBLIC_RESTAPI_URL}/get-blogs/`,
//     (req, res, ctx) => {
//       return res(
//         ctx.status(200),
//         ctx.json([
//           {
//             id: 1,
//             title: 'dummy title 1',
//             content: 'dummy body 1',
//             username: 'dummy user name 1',
//             tags: [
//               {
//                 id: 1,
//                 name: 'dummy tag name 1',
//               },
//               {
//                 id: 2,
//                 name: 'dummy tag name 2',
//               },
//             ],
//             created_at: 'dummy',
//           },
//         ])
//       )
//     }
//   )
// )

// beforeAll(() => {
//   server.listen()
// })

// afterEach(() => {
//   server.resetHandlers()
//   cleanup()
// })

// afterAll(() => {
//   server.close()
// })

// describe(`Todo page / getStaticProps`, () => {
//   it('Should render the list of tasks pre-fetched by getStaticProps', async () => {
//     const { page } = await getPage({
//       route: '/',
//     })
//     render(page)
//     expect(await screen.findByText('new blog page')).toBeInTheDocument()
//     screen.debug()
//   })
// })
