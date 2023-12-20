'use client'
import { Button, Image, Input, Pagination } from '@nextui-org/react'
import { signOut } from 'firebase/auth'
// import Image from 'next/image'
import React, { useEffect } from 'react'
import { auth } from './firebase/config'
import { useRouter } from 'next/navigation'

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
      <header className='w-full m-24 flex gap-2'>
        <Input value={search} className='w-1/2' onChange={(e) => {
          setSearch(e.target.value)
        }}></Input>
        <Button onClick={() => {
          handleSearch()
        }}>Search</Button>
        <Button onClick={handleLogout} color='primary' variant='flat' value="Login" className="p-2 px-10 w-auto cursor-pointer rounded-full m-auto text-white bg-gray-500 hover:text-cyan-300 transition-all" >{loading ? "Logging out..." : "Logout"}</Button>
      </header>

      <main className="flex h-fit flex-row items-center gap-2 justify-between p-24">
        {gifloading == false ? currentPosts.map((item: any) => {

          return (
            <div key={item.id}>
              <div key={item.id} className="flex flex-col gap-2 h-screen/2 justify-center items-center mt-24">
                <Image
                  key={item.id}
                  src={item.images.original.url}
                  width={500}
                  alt={item.title}
                />

              </div>
              <h1 className='text-3xl font-bold'>{item.title}</h1>
              <h2>@{item.username}</h2>
            </div>
          )
        }
        ) : <h1>Loading</h1>}
      </main>
      <footer>
        { }
      </footer>
    </>
  )
}
