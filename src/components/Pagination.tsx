import { Button } from '@nextui-org/react'
import React from 'react'

const Pagination = ({ postsPerPage, totalposts, prevpaginate, nextpaginate, setCurrentPages }: any) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(postsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className='flex flex-row gap-2'>
            <Button
                className='bg-transparent font-extrabold text-xl'
                onClick={() => {
                    prevpaginate()
                }}
            >Previous</Button>
            {
                pageNumbers.map((number) => (
                    <button onClick={
                        () => {
                            setCurrentPages(number)
                        }

                    } className='bg-blue-200 border border-b-2 border-blue-700 w-8 rounded-lg outline-none text-center' key={number}>

                        {number}

                    </button>
                ))
            }
            <Button
                className='bg-transparent font-extrabold text-xl'
                onClick={() => {
                    nextpaginate()
                }}
            >Next</Button>
        </div>
    )
}

export default Pagination