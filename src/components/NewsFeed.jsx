import Typography from "@mui/material/Typography";
import NewsArticle from "./NewsArticle";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingArticale from "./LoadingArticale";
const NewsFeed = ({ articles, loading }) => {
  if (!loading && !articles.length) {
    return (
      <Typography
        align="center"
        variant="h6"
        color="textSecondary"
        marginTop={4}
      >
        No articles found.
      </Typography>
    );
  }
  return (
    <div>
      {loading && [...Array(5)].map((_, i) => <LoadingArticale key={i} />)}
      {!loading &&
        articles.map((article) => {
          return <NewsArticle key={JSON.stringify(article)} {...article} />;
        })}
    </div>
  );
};

export default NewsFeed;
