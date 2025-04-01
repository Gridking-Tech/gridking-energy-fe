import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'

type SearchModalProps = {
    showSearch: boolean
    setShowSearch: (showSearch:boolean) => void
}
function SearchModals({showSearch,setShowSearch}:SearchModalProps) {
    return (
        <AnimatePresence >
            {showSearch && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}

                    className="w-screen h-screen flex items-center flex-col justify-center bg-black/70  fixed z-[100] top-0   shadow-lg right-0"
                >
                    <div className='h-[10%] w-[80%] xl:w-[34%] relative'>
                        <div className='text-4xl right-0 top-0 absolute cursor-pointer' onClick={() => setShowSearch(false)}>x</div>
                    </div>
                    <div className='xl:w-[30%] w-[80%] outline-0 flex items-center relative justify-between rounded-[0.3rem] border-b-2 border-white  py-2 px-6'>

                        <input type="text" placeholder='search... ' className=" text-[1.2rem] w-full outline-0 " />
                        <RiSearch2Line size={30} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SearchModals
