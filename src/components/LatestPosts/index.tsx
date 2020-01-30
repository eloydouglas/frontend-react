import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { FaSpinner } from 'react-icons/fa' 
import PostList from './PostList'

const LatestPosts: React.FC = () => {
    const [posts, setposts] = useState(
        {
            data: [],
            error: null,
            loading: false
        }
    )

    const [pages, setpages] = useState(
        {
            currentPage:1,
            limit:1
        }
    )

    useEffect(() => {
        if(!posts.error && !posts.loading && posts.data.length === 0){
            fetchPosts(1);
        }
        
    }, [posts])

    const fetchPosts = async (page: Number) => {

        setposts({...posts, loading: true})
        
        const response = await axios.get(`https://gorest.co.in/public-api/posts?_format=json&access-token=${process.env.REACT_APP_API_TOKEN}&page=${page}`)

        try{
            if(response.status !== 200){
                throw new Error("Could not fetch posts from https://gorest.co.in/")
            }else{
                if(response.data._meta.status === 401){
                    throw new Error("Invalid token")
                }else if(!response.data._meta.success){
                    throw new Error("An error occurred when trying to fetch posts")
                }else{
                    setposts({...posts, data: response.data.result, error: null, loading: false})
                    setpages({...pages, currentPage: response.data._meta.currentPage, limit: response.data._meta.pageCount })
                }
            }
        }catch(err){

            console.log(err)


            setposts({...posts, error: err, loading: false})
        }

        console.log(response)
    }

    return (
        <div className='container'>

            {posts.loading ? 
                <div className='spinnerContainer'>
                    <FaSpinner className='appSpinner'/>
                </div>
            :
                <>
                    <span className='title'>Últimas Postagens</span>
                    <div className='contentContainer'>
                        <PostList posts={posts.data} pages={pages} fetchPosts={fetchPosts}/>
                    </div>
                    <div className='footer'>
                        <span >Exibindo {posts.data.length} postagens</span>
                    </div>
                </>
            }   
        </div>
)}

export default LatestPosts