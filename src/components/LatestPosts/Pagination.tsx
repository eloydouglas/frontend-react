import React, {useEffect, useState} from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

type PostListProps = {
    fetchPosts: Function,
    pages: any
}


const Pagination = ({fetchPosts, pages}: PostListProps) => {

    const [numbers, setNumbers] = useState(findPage())

    useEffect(() => {
        setNumbers(findPage)
    }, [setNumbers, findPage])
    
    function findPage () {

        let numbers

        if(pages.currentPage === pages.limit){
            numbers = [
                {
                    label: pages.currentPage - 2,
                    selected: false
                },
                {
                    label: pages.currentPage - 1,
                    selected: false
                },
                {
                    label: pages.currentPage,
                    selected: true
                }
            ]
        }else if(pages.currentPage === 1){
            numbers = [
                {
                    label: 1,
                    selected: true
                },
                {
                    label: pages.currentPage + 1,
                    selected: false
                },
                {
                    label: pages.currentPage + 2,
                    selected: false
                }
            ]
        }else{
            numbers = [
                {
                    label: pages.currentPage - 1,
                    selected: false
                },
                {
                    label: pages.currentPage,
                    selected: true
                },
                {
                    label: pages.currentPage + 1,
                    selected: false
                }
            ]
        }

        return numbers;
    }


    
    return (
        <>
            <FaAngleLeft onClick={numbers[0].selected ? () => {} : () => { fetchPosts(pages.currentPage - 1) }} className='navIcon left'/>
                <div>
                    <span onClick={()=>fetchPosts(numbers[0].label)} className={`numberContainer ${numbers[0].selected && 'selected'}`}>
                        <span>{numbers[0].label}</span>
                    </span>
                    <span onClick={()=>fetchPosts(numbers[1].label)} className={`numberContainer ${numbers[1].selected && 'selected'}`}>
                        <span>{numbers[1].label}</span>
                    </span>
                    <span onClick={()=>fetchPosts(numbers[2].label)} className={`numberContainer ${numbers[2].selected && 'selected'}`}>
                        <span>{numbers[2].label}</span>
                    </span>
                </div>
            <FaAngleRight onClick={numbers[2].selected ? () => {} : () => { fetchPosts(pages.currentPage + 1) }} className='navIcon right'/>
        </>
)};

export default Pagination;
