import { Post } from "@/API";
import { ReactElement } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IconButton from '@mui/material/IconButton';

interface IProps {
    post: Post
}

const PostPreview = ({ post }: IProps): ReactElement => {
    return (
        <Paper elevation={3}>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={3}
                style={{ width: "100%", padding: "12px", marginTop: "22px" }}
            >
                <Grid item style={{ maxWidth: "128px" }}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <IconButton color="inherit">
                                <ArrowUpwardIcon style={{ maxWidth: "22px" }} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            value
                        </Grid>
                        <IconButton color="inherit">
                            <ArrowDownwardIcon style={{ maxWidth: "22px" }} />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction="column" alignItems={"flex-start"}>
                        <Grid item>
                            <Typography variant="body1">Posted by <b>{post.owner}</b> at <b>{post.createdAt}</b> </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">at {post.createdAt} </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h2">{post.title} </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default PostPreview;

