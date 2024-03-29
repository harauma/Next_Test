import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

interface TITLE {
  title: string
}

const Layout: React.FC<TITLE> = ({ children, title = 'Next.js' }) => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="bg-gray-800 w-screen">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
              <Link href="/">
                <a
                  data-testid="django-blog-nav"
                  className="textgray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  DjangoBlog
                </a>
              </Link>
              <Link href="/blog-page">
                <a
                  data-testid="blog-nav"
                  className="textgray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Blog
                </a>
              </Link>
              <Link href="/comment-page">
                <a
                  data-testid="comment-nav"
                  className="textgray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Comment
                </a>
              </Link>
              <Link href="/context-page">
                <a
                  data-testid="context-nav"
                  className="textgray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Context
                </a>
              </Link>
              <Link href="/task-page">
                <a
                  data-testid="task-nav"
                  className="textgray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Todos
                </a>
              </Link>
              <Link href="/admin-page">
                <a
                  data-testid="admin-nav"
                  className="textgray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Admin
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 justify-center items-center flex-col w-screen">
        {children}
      </main>
      <footer>
        <a
          className="flex item-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Layout
