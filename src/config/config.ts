const urls = {
    serverUrl: 'http://192.168.43.18:5002/'
};
const endpoints = {
    FetchNews: 'fetchnews/?query=',
    FetchTweets: 'fetchtweets' , 
    
};
export function endpoint(name) {
    return urls.serverUrl + endpoints[name];
}