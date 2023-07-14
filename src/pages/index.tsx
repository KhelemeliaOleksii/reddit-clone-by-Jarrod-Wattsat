import { useUser } from '@/context/AuthContext';
// import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { listPosts } from '@/graphql/queries';
import { API } from 'aws-amplify';
import { ListPostsQuery, Post } from '@/API';
import PostPreview from '@/components/PostPreview';
import Container from '@mui/material/Container';

export default function Home() {
    const { user } = useUser();
    const [posts, setPosts] = useState<Array<Post | null>>([null])


    useEffect(() => {
        const fetchPostFromApi = async (): Promise<Array<Post | null> | never> => {
            try {
                const { data } = (await API.graphql({ query: listPosts })) as {
                    data: ListPostsQuery,
                    errors: any,
                };
                if (!(data.listPosts?.items)) {
                    throw new Error("Could not get posts");
                }
                return data.listPosts.items;
            } catch (error) {
                throw error;
            }
        }

        fetchPostFromApi()
            .then(data => {
                console.log("data", data);
                if (data === null) {
                    setPosts([])
                }
                setPosts(data);
            })
            .catch(error => {
                console.log("fetchPostFromApi. Error", error)
            });
    }, []);
    console.log("index component. User", user);
    console.log("index component. Data", posts);

    // <Typography variant='h1'>
    //     HelloWorld
    // </Typography>

    return (
        <Container maxWidth="md">
            {posts.map((post) => {
                if (!post) {
                    return null;
                }
                return (
                    <PostPreview key={post.id} post={post} />
                )
            })}
        </Container>
    )
}

// import * as React from 'react';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Link from '../components/Link';
// import ProTip from '../components/ProTip';
// import Copyright from '../components/Copyright';

// export default function Home() {
//     return (
//         <Container maxWidth="lg">
//             <Box
//                 sx={{
//                     my: 4,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                 }}
//             >
//                 <Typography variant="h4" component="h1" gutterBottom>
//                     Material UI - Next.js example in TypeScript
//                 </Typography>
//                 <Link href="/about" color="secondary">
//                     Go to the about page
//                 </Link>
//                 <ProTip />
//                 <Copyright />
//             </Box>
//         </Container>
//     );
// }