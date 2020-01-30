import React from 'react';

import Row from './Row';

type PostListProps = {
    posts: Array<any>,
}

const PostList = ({posts } : PostListProps) => (
    <>

        <Row titleStyle={true} postContent={[ "Título", "Conteúdo", "Data de publicação" ]}/>
        {posts.map(post => 
            <Row key={post.id} titleStyle={false} postContent={[ post.title, post.body, "-----" ]}/>
        )}
    </>
)

export default PostList
