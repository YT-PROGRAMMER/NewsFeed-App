import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));
function NewsArticle({ image, url, title, description, author, publishedAt }) {
  return (
    <StyledCard>
      <a href={url} target="_blank">
        <CardActionArea>
          {image && (
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt="Sample article"
              loading="lazy"
            />
          )}

          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </a>
      <Box p={2}>
        <Typography variant="caption" color="textSecondary" display="block">
          {author}
        </Typography>
        {publishedAt && (
          <Typography variant="caption" color="textSecondary">
            {new Date(publishedAt).toLocaleDateString()}
          </Typography>
        )}
      </Box>
    </StyledCard>
  );
}
export default NewsArticle;
