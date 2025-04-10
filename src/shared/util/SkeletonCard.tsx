import React from 'react'

export default function SkeletonCard() {
    return (
        <div className="animate-pulse rounded-lg bg-gray-200 h-[10rem] w-full">
            <div className="h-full w-full bg-gray-300 rounded-lg"></div>
            <div className="h-4 mt-2 bg-gray-300 rounded w-2/3 mx-auto"></div>

        </div>
    )
}
