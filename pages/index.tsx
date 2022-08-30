import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getAllPostDataAtDjangoApi } from '../lib/fetch'
import { POST_DJANGO_API } from '../types/Types'
import Cookie from 'universal-cookie'

const cookie = new Cookie()

interface STATICPROPS {
  posts: POST_DJANGO_API[]
}

const DjangoBlogPage: React.FC<STATICPROPS> = ({ posts }) => {
  const [hasToken, setHasToken] = useState(false)
  const logout = () => {
    cookie.remove('access_token')
    setHasToken(false)
  }
  const deletePost = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/delete-blog/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid')
      }
    })
  }

  useEffect(() => {
    if (cookie.get('access_token')) {
      setHasToken(true)
    }
  }, [])

  return (
    <Layout title="DjangoBlog">
      <p className="text-4xl mb-10">django blog page</p>
      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <Link href={`/django-posts/${post.id}`}>
                <a className="customer-pointer border-b border-gray-500 hover:bg-gray-300">
                  {post.title}
                </a>
              </Link>
              {hasToken && (
                <svg
                  data-testid={`btn-${post.id}`}
                  onClick={() => deletePost(post.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-10 float-right cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </li>
          ))}
      </ul>
      {hasToken && (
        <svg
          data-testid="logout-icon"
          onClick={logout}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mt-10 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      )}
    </Layout>
  )
}
export default DjangoBlogPage

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPostDataAtDjangoApi()
  return {
    props: { posts },
    revalidate: 3,
  }
}
