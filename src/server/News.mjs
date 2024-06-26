import unirest from 'unirest';
import { load } from 'cheerio';

const getFinanceData =  () => {
    const url = "https://www.google.com/finance/?hl=en";
    const response =  get(url)
      .header({"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"});
    const $ = load(response.body);
  
    let financial_news = [];
    $(".yY3Lee").each((i, el) => {
      financial_news.push({
        title: $(el).find(".Yfwt5").text(),
        link: $(el).find("a").attr("href"),
        source: $(el).find(".sfyJob").text(),
        time: $(el).find(".Adak").text()
      })
    });
  
    let market_trends = [];
    $(".gR2U6").each((i, el) => {
      market_trends[i] = $(el).text();
    });
  
    let interested_bottom = [];
    $(".tOzDHb").each((i, el) => {
      interested_bottom.push({
        stock_name: $(el).find(".RwFyvf").text(),
        price: $(el).find(".YMlKec").text(),
        change_in_percentage: $(el).find(".JwB6zf").text()
      })
    });
  
    let calendar_results = [];
    $(".kQQz8e").each((i, el) => {
      calendar_results.push({
        stock_name: $(el).find(".qNqwJf").text(),
        date_and_time: $(el).find(".fbt0Xc").text(),
        link: $(el).find("a").attr("href")
      })
    });
  
    let most_followed_on_google = [];
    $(".NaLFgc").each((i, el) => {
      most_followed_on_google.push({
        stock_name: $(el).find(".TwnKPb").text(),
        following: $(el).find(".Iap8Fc").text().replace(" following", ""),
        change_in_percentage: $(el).find(".JwB6zf").text(),
        link: $(el).find("a").attr("href")
      })
    });
  
    console.log("financial_news:", financial_news);
    console.log("market_trends:", market_trends);
    console.log("interested_bottom:", interested_bottom);
    console.log("calendar_results:", calendar_results);
    console.log("most_followed_on_google:", most_followed_on_google);
  
    return financial_news;
  }
  
  export default getFinanceData;