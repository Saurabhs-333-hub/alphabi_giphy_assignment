'use client'
import { Button, Image, Input } from '@nextui-org/react'
import { signOut } from 'firebase/auth'
// import Image from 'next/image'
import React, { useEffect } from 'react'
import { auth } from './firebase/config'
import { useRouter } from 'next/navigation'
import Pagination from '@/components/Pagination'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    if (!auth.currentUser) {
      router.replace('/login')
    }
  },)
  const [loading, setLoading] = React.useState(false)
  const [gifloading, setGifLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [postsPerPage, setPostsPerPage] = React.useState(3)

  const handleLogout = async () => {
    setLoading(true)
    await signOut(auth)
    setLoading(false)
  }
  const [search, setSearch] = React.useState('')
  const [data, setData] = React.useState([]);

  const [pagination, setPagination] = React.useState({
    count: 0,
    offset: 0,
    total_count: 0,
  })
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
  const handleSearch = async () => {
    setGifLoading(true)
    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65`
    const res = await fetch(url)
    const resJson = await res.json()
    setData(resJson.data)
    setPagination(resJson.pagination)
    setGifLoading(false)
    return resJson
  }
  return (
    <>
      <header className='w-full mt-12 flex justify-center px-12  items-center gap-2'>
        <Input placeholder='Article name or Keywords' value={search} className='w-full' onChange={(e) => {
          setSearch(e.target.value)
        }} />

        <Button className='bg-black text-white p-7' onClick={() => {
          handleSearch()
        }}>
          Search
        </Button>

        <Button onClick={handleLogout} color='primary' variant='flat' value="Login" className="p-2 px-10 w-auto cursor-pointer rounded-full m-auto text-white bg-gray-500 hover:text-cyan-300 transition-all" >{loading ? "Logging out..." : "Logout"}</Button>
      </header>

      <main className="flex flex-row items-center gap-2 justify-between">
        {gifloading == false ? currentPosts.map((item: any) => {

          return (
            <section key={item.id} className=''>
              <div key={item.id} className="flex flex-col h-96 gap-2 justify-center items-center">
                <Image
                  key={item.id}
                  src={item.images.original.url}
                  width={300}
                  alt={item.title}
                />
              </div>
              <div className="flex flex-col gap-2 max-w-1/3">
                <h1 className='text-2xl font-bold'>{item.title}</h1>
                <h2>@{item.username}</h2>
              </div>
            </section>

          )
        }
        ) : <h1>Loading</h1>}
      </main>
      <footer className='p-12'>
        {data.length == 0 ? <span></span> : <Pagination postsPerPage={postsPerPage} totalposts={pagination.count} nextpaginate={
          () => {
            if (currentPage < pagination.count) {

              setCurrentPage(currentPage + 1)
            }
          }
        }
          setCurrentPages={
            (number: any) => {
              setCurrentPage(number)
            }
          } prevpaginate={
            () => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
              }
            }
          } />
        }
      </footer>
    </>
  )
}
