package service

// import (
// 	"encoding/json"
// 	"fmt"
// 	"io/ioutil"
// 	"log"
// 	"net/http"
// 	models "whos_watching/models"
// )

// const (
// 	newsApiUrl = "https://newsapi.org/v2/everything"
// 	apiKey     = "16eabca179494fa391757fa32d70a9cd"
// )

// type NewsApiService struct {
// 	url string
// }

// func NewNewsApiService() *NewsApiService {
// 	return &NewsApiService{url: newsApiUrl}
// }

// func (n *NewsApiService) GetNewsArticle(qry string) (models.NewsApiArticleModel, error) {
// 	var result models.NewsApiArticleModel
// 	var err error
// 	req, _ := http.NewRequest(http.MethodGet, newsApiUrl, nil)
// 	req.Header.Set("x-api-key", apiKey)
// 	q := req.URL.Query()
// 	q.Add("qInTitle", "+"+qry+"TV Show")
// 	req.URL.RawQuery = q.Encode()

// 	fmt.Println(req.URL.String())

// 	resp, err := http.DefaultClient.Do(req)
// 	if err != nil {
// 		log.Printf("news api error")
// 		return result, err
// 	}
// 	var apiResponse models.NewsApiResponseModel
// 	defer resp.Body.Close()

// 	bodyBytes, err := ioutil.ReadAll(resp.Body)
// 	if err != nil {
// 		log.Fatal(err)
// 		return result, err
// 	}

// 	err = json.Unmarshal(bodyBytes, &apiResponse)

// 	if err != nil {
// 		log.Panicln("error decoding", err)
// 		return result, err
// 	}
// 	var firstArticle models.NewsApiArticleModel
// 	if len(apiResponse.Articles) > 0 {
// 		firstArticle = apiResponse.Articles[0]
// 	}
// 	return firstArticle, nil
// }
