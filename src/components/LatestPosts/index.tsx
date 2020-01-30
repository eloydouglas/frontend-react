import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { FaSpinner } from 'react-icons/fa' 
import PostList from './PostList'
import Pagination from './Pagination'

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
        
    }, [posts, fetchPosts])

    async function fetchPosts(page: Number) {

        setposts({...posts, loading: true})
        
        try{
            const response = await axios.get(`https://gorest.co.in/public-api/posts?_format=json&access-token=${process.env.REACT_APP_API_TOKEN}&page=${page}`)
            if(response.status !== 200){
                throw "Não consegui buscar os posts em https://gorest.co.in/ ."
            }else{
                if(response.data._meta.code === 401){
                    throw "Credenciais inválidas, verifique sua token."
                }else if(!response.data._meta.success){
                    throw "Ocorreu um erro ao tentar buscar os posts."
                }else{
                    setposts({...posts, data: response.data.result, error: null, loading: false})
                    setpages({...pages, currentPage: response.data._meta.currentPage, limit: response.data._meta.pageCount })
                }
            }
        }catch(err){

            setposts({...posts, error: err, loading: false})
        }
    }

    return (
        <div className='container'>

            {posts.loading ? 
                <div className='spinnerContainer'>
                    <FaSpinner className='appSpinner'/>
                </div>
            :
                posts.error ? 
                    <div>
                        {posts.error}
                    </div> 
                :
                
                <>
                    <span className='title'>Últimas Postagens</span>
                    <div className='contentContainer'>
                        <PostList posts={posts.data}/>
                    </div>
                    <div className='footer'>
                        <span >Exibindo {posts.data.length} postagens</span>
                        <div className='paginationContainer'>
                            <Pagination fetchPosts={fetchPosts} pages={pages}/>
                        </div>
                    </div>
                </>
            }   
        </div>
)}

export default LatestPosts