import { Post } from "@/API";
import { ReactElement } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

interface IProps {
    post: Post
}

const PostPreview = ({ post }: IProps): ReactElement => {
    return (
        <Grid container>
            <Grid item>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        up
                    </Grid>
                    <Grid item>
                        value
                    </Grid>
                    <Grid item>
                        down
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="row" spacing={3} justifyContent="space-around">
                    <Grid item>
                        left
                    </Grid>
                    <Grid item>
                        center
                    </Grid>
                    <Grid item>
                        right
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
    // <Paper elevation={3}>
    //     <Grid
    //         container
    //         direction="row"
    //         justify="flex-start"
    //         alignItems="flex-start"
    //         wrap="nowrap"
    //         spacing={3}
    //         style={{ padding: 12, marginTop: 24 }}
    //     >
    //         {/* Upvote / votes / downvote */}
    //         <Grid item style={{ maxWidth: 128 }}>
    //             <Grid container direction="column" alignItems="center">
    //                 <Grid item>
    //                     k
    //                 </Grid>
    //                 <Grid item>
    //                     <Grid container alignItems="center" direction="column">
    //                         <Grid item>
    //                             <Typography variant="h6">s</Typography>
    //                         </Grid>
    //                         <Grid item>
    //                             <Typography variant="body2">votes</Typography>
    //                         </Grid>
    //                     </Grid>
    //                 </Grid>
    //                 <Grid item>
    //                     button
    //                 </Grid>
    //             </Grid>
    //         </Grid>

    //         {/* Content Preview */}
    //         <Grid item>
    //             <ButtonBase onClick={() => { }}>
    //                 <Grid container direction="column" alignItems="flex-start">
    //                     <Grid item>
    //                         <Typography variant="body1">
    //                             body
    //                         </Typography>
    //                     </Grid>
    //                     <Grid item>
    //                         <Typography variant="h2">post.title</Typography>
    //                     </Grid>
    //                     <Grid
    //                         item
    //                         style={{
    //                             maxHeight: 32,
    //                             overflowY: "hidden",
    //                             overflowX: "hidden",
    //                         }}
    //                     >
    //                         <Typography variant="body1">post.contents</Typography>
    //                     </Grid>
    //                 </Grid>
    //             </ButtonBase>
    //         </Grid>
    //     </Grid>
    // </Paper>)
}

export default PostPreview;

// export default function PostPreview() {
//     return (
//         <Box sx={{ flexGrow: 1 }}>
//         <Grid container direction="row" spacing={1}>
//             <Grid container item spacing={3}>
//                 <FormRow />
//             </Grid>
//             <Grid container item spacing={3}>
//                 <FormRow />
//             </Grid>
//             <Grid container item spacing={3}>
//                 <FormRow />
//             </Grid>
//         </Grid>
//         </Box>
//     );
// }