import { Button, Container, styled, Typography } from "@mui/material";
import NewsFeed from "./components/NewsFeed";
import NewsHeader from "./components/NewsHeader";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 2),
  display: "flex",
  justifyContent: "space-between",
}));
const PAGE_SIZE = 5;
    const apiKey = import.meta.env.VITE_NEWS_API_KEY
function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("general");
  const pageNumber = useRef(1);
  const qureyValue = useRef("");
  const loadData = async (currentCategory) => {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${currentCategory}&q=${
        qureyValue.current
      }&page=${pageNumber.current}&pageSize=${PAGE_SIZE}&country=us&apiKey=${apiKey}`
    );

    const data = await res.json();


    return (data.articles = data.articles.map((article) => {
      const { url, title, description, author, publishedAt, urlToImage } =
        article;
      return {
        title,
        description,
        author,
        url,
        publishedAt,
        image: urlToImage,
      };
    }));
  };

  const fetchAndUpdateArticles = (currentCategory) => {
    setError("");
    loadData(currentCategory ?? category)
      .then((newData) => {
        setArticles(newData);
      })
      .catch((error) => {
        if(!apiKey) {
        setError("visit website 'newsfeed.org' to get apikey");
          
        }else {
          
        setError("An error has occurred");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debouncedLoadData = debounce(fetchAndUpdateArticles, 1000);

  useEffect(() => {
    fetchAndUpdateArticles();
  }, []);

  const handleSearchChange = (newQurey) => {
    pageNumber.current = 1;
    qureyValue.current = newQurey;
    debouncedLoadData(newQurey);
  };

  const handleNextClick = () => {
    pageNumber.current += 1;

    fetchAndUpdateArticles();
  };
  const handlePreviousClick = () => {
    pageNumber.current -= 1;

    fetchAndUpdateArticles();
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    pageNumber.current = 1;
    fetchAndUpdateArticles(event.target.value);
  };

  return (
    <Container>
      <NewsHeader
        onSearchChange={handleSearchChange}
        category={category}
        setCategory={handleCategoryChange}
      />
      {error === "" ? (
        <NewsFeed articles={articles} loading={loading} />
      ) : (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      <Footer>
        <Button
          variant="outlined"
          onClick={handlePreviousClick}
          disabled={loading || pageNumber.current === 1}
        >
          previous
        </Button>

        <Button
          variant="outlined"
          onClick={handleNextClick}
          disabled={loading || pageNumber.current === PAGE_SIZE}
        >
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;
