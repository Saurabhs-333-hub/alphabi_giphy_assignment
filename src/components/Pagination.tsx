import { Button } from '@nextui-org/react'
import React from 'react'

const Pagination = ({ postsPerPage, totalposts, prevpaginate, nextpaginate }: any) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalposts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className='flex flex-row gap-2'>
            <Button
                className='bg-gray-500'
                onClick={() => {
                    prevpaginate()
                }}
            >Previous</Button>
            {
                pageNumbers.map((number) => (
                    <ul key={number}>
                        <li key={number}>
                            {number}
                        </li>
                    </ul>
                ))
            }
            <Button
                className='bg-gray-500'
                onClick={() => {
                    nextpaginate()
                }}
            >Next</Button>
        </div>
    )
}

export default Pagination