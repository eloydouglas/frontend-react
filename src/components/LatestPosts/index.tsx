import React, {useState, useEffect} from 'react'
import axios from 'axios'

// const token = 'MnVtX4FImyvrmeckr-yiLuBwzxrDehUPVVe';
const token = 'MnVtX4FImyvrmeckr-yiLuBwzxrDehUPVVe2';

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


    const fetchPosts = async () => {

        setposts({...posts, loading: true})
        
        const response = await axios.get(`https://gorest.co.in/public-api/posts?_format=json&access-token=${token}&page=${2}`)

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

    useEffect(() => {
        if(!posts.error && !posts.loading && posts.data.length === 0){
            // fetchPosts();
        }
        
    }, [posts])

    return (
    <div className='container'>
        
    </div>
)}

export default LatestPosts