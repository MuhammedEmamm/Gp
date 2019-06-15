const urls = {
    serverUrl: 'http://192.168.43.247:5002/'
};
const endpoints = {
    FetchNews: 'fetchnews/?query=',
    FetchTweets: 'fetchtweets' , 
    WordCloud:'wordcloud/?country='
};
export function endpoint(name) {
    return urls.serverUrl + endpoints[name];
}