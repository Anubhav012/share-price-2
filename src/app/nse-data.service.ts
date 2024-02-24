// nse-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NseDataService {
  private apiUrl = '/api/event-calendar';

  constructor(private http: HttpClient) { }

  fetchData(fromDate: string, toDate: string): Observable<any> {
    const url = `${this.apiUrl}?index=equities&from_date=${fromDate}&to_date=${toDate}`;

    // Add headers similar to the ones used in Postman
    const headers = new HttpHeaders({
      'authority': 'www.nseindia.com',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'max-age=0',
      'cookie': 'defaultLang=en; _ga=GA1.1.819004912.1707208398; nsit=2i5YXsNUXj0FL79POZONHy6U; AKA_A2=A; ak_bmsc=507F5D29227C36E98285D03FFF563591~000000000000000000000000000000~YAAQDyozak+CVKyNAQAAJvPXtRZ97zHvZZ1+LlYMZwXoRQAx7Du4ZT6cWyooy2hPaB8XIWsZcmiX6mD9NxBpU+mpyAJDZ+GetXK9d9KufH0PloY96rYWNZmt/5g9NmPnqgjrxEhTzfXtYyIrcEh07CijPvpN9AagEu8V+G7ip+NjpuhujnakV6iX8LLaJzoQEmIDl5be1A0CXcJRKneP0F8Krsw8kV4lfLcLW16wzFQL525r1jkkOP0q37UXQlckOfya9iQGurfI+B1sDcG39qKzUI59u8myz/SSoALYTxyoA8xWEWC+FBbgfGmqxkAVNM6hOkKqTq14VzLSobAnHRhSYf93iCR4RqiwzMuwUV+sIwHBETSMyoLl7fk5epFRNuk1rkJjNiiT7nHc0q5vaFdRRSpw/E6HJmx6MHn/uiEA9FIHYtGfm63rLvfUFUcNbAwkaEq+Ipu8aJQINqI1h/MmupfQxOEHuwGshuPn07T98yeYRhINGNwTAZOQ0qT4u0M=; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnS; nseQuoteSymbols=[{"symbol":"SBIN","identifier":null,"type":"equity"},{"symbol":"LT","identifier":null,"type":"equity"},{"symbol":"IFCI","identifier":null,"type":"equity"}]; bm_sv=19C307A772A043BC4FBCF20C9BA24EC9~YAAQDyozajGkVKyNAQAAUgPbtRZ1wkbiW1Bc1S+KRlyfp3nT9zOAsPX8LGqJr5b/Glvu0auKAULJYFcwFRg4ErAnaEOV99VOG5ZvLihLg9+sRuZc3GlqMohhd9DAb1xg1+A1/EDXoxD/b90r+qva/bvwTM7gbuapra2RFMc8H56PXAQ6vDt/7qN5KOABah03Z7TFqpejxRY7cGThEwXoBUnqc0vVfGn+hzCryApbjmn4DSnIKCRvwuWAO6UWTKvEiS5Y~1; RT="z=1&dm=nseindia.com&si=7a4effc2-2d74-4f95-9b2f-72a7b1bfbfac&ss=lspq3jy9&sl=9&se=8c&tt=coj&bcn=%2F%2F684d0d48.akstat.io%2F&ld=3qnh&nu=kpaxjfo&cl=3r2a&ul=4gna&hd=4gnw"; _ga_87M7PJ3R97=GS1.1.1708152812.5.1.1708153049.0.0.0; _ga_QJZ4447QD3=GS1.1.1708152812.3.1.1708153049.0.0.0; AKA_A2=A; ak_bmsc=6AEB52D26F589DC3ACB0342929E14FCC~000000000000000000000000000000~YAAQDyozahNnVayNAQAAwJzwtRbzwVkc4H5MySImQB5nhYTa3Xibi5FdRlBFKIOuQeRCsFndUnnC1ZVA8NVTMtc822/F+rqEx/ErVoIuS4ao2n1ZoTGsB16GvL/HPCKEoChgLXSKJkFdbvLv2m3nRNG5XDFHfqKbbxjtIov8dt6BR5+BN8MtGNejDDHQL8sorrXtk+C2uGGgmoMpNu3cmxPFD8iF4mzosyMnz15I/k4P+28vIOcli83bRgzE/VW2G++dQ6WHO0S06RdCyi27p9DdPyis0w3OFlrR0FVCoB1iC6X7QvDUtjCdn4e5EeS3db6dWjARNMNKxN7ZCVy/JrxFRfIyQl4E8Z9pIYXewSGdITFkk1jwZLctHZpUXA==; bm_sv=19C307A772A043BC4FBCF20C9BA24EC9~YAAQDyozalKiVayNAQAAeOj3tRbKAK2gFjhsC+cyGFn+Nw2I54aqte07iFzS/3SARNu050d8QxIB0Gn5z9pBrTgsmNNcxojsJ5MQMAXFzNvX5e7TsAlFjmUYaeAvE39vXubwM4Q1g1YrvxyxX1YI9y/D/fnKQkwmQNU2FH400AvwYVgkV5DiPst0IUIfUEn1iBWK3j4XKQSkpwf+Nu43g/cFP+quW8d607fxVn5xn0yPLCWF00CWX6Bb9CzCyXakoVnu~1; RT="z=1&dm=nseindia.com&si=7a4effc2-2d74-4f95-9b2f-72a7b1bfbfac&ss=lspq3jy9&sl=9&se=8c&tt=coj&bcn=%2F%2F684d0d48.akstat.io%2F&ld=3qnh&nu=kpaxjfo&cl=3r2a&ul=4gna&hd=4gnw"; _ga_87M7PJ3R97=GS1.1.1708152812.5.1.1708153049.0.0.0; _ga_QJZ4447QD3=GS1.1.1708152812.3.1.1708153049.0.0.0; AKA_A2=A; ak_bmsc=6AEB52D26F589DC3ACB0342929E14FCC~000000000000000000000000000000~YAAQDyozahNnVayNAQAAwJzwtRbzwVkc4H5MySImQB5nhYTa3Xibi5FdRlBFKIOuQeRCsFndUnnC1ZVA8NVTMtc822/F+rqEx/ErVoIuS4ao2n1ZoTGsB16GvL/HPCKEoChgLXSKJkFdbvLv2m3nRNG5XDFHfqKbbxjtIov8dt6BR5+BN8MtGNejDDHQL8sorrXtk+C2uGGgmoMpNu3cmxPFD8iF4mzosyMnz15I/k4P+28vIOcli83bRgzE/VW2G++dQ6WHO0S06RdCyi27p9DdPyis0w3OFlrR0FVCoB1iC6X7QvDUtjCdn4e5EeS3db6dWjARNMNKxN7ZCVy/JrxFRfIyQl4E8Z9pIYXewSGdITFkk1jwZLctHZpUXA==; bm_sv=19C307A772A043BC4FBCF20C9BA24EC9~YAAQDyozalKiVayNAQAAeOj3tRbKAK2gFjhsC+cyGFn+Nw2I54aqte07iFzS/3SARNu050d8QxIB0Gn5z9pBrTgsmNNcxojsJ5MQMAXFzNvX5e7TsAlFjmUYaeAvE39vXubwM4Q1g1YrvxyxX1YI9y/D/fnKQkwmQNU2FH400AvwYVgkV5DiPst0IUIfUEn1iBWK3j4XKQSkpwf+Nu43g/cFP+quW8d607fxVn5xn0yPLCWF00CWX6Bb9CzCyXakoVnu~1; RT="z=1&dm=nseindia.com&si=7a4effc2-2d74-4f95-9b2f-72a7b1bfbfac&ss=lspq3jy9&sl=9&se=8c&tt=coj&bcn=%2F%2F684d0d48.akstat.io%2F&ld=3qnh&nu=kpaxjfo&cl=3r2a&ul=4gna&hd=4gnw"; _ga_87M7PJ3R97=GS1.1.1708152812.5.1.1708153049.0.0.0; _ga_QJZ4447QD3=GS1.1.1708152812.3.1.1708153049.0.0.0; AKA_A2=A; ak_bmsc=6AEB52D26F589DC3ACB0342929E14FCC~000000000000000000000000000000~YAAQDyozahNnVayNAQAAwJzwtRbzwVkc4H5MySImQB5nhYTa3Xibi5FdRlBFKIOuQeRCsFndUnnC1ZVA8NVTMtc822/F+rqEx/ErVoIuS4ao2n1ZoTGsB16GvL/HPCKEoChgLXSKJkFdbvLv2m3nRNG5XDFHfqKbbxjtIov8dt6BR5+BN8MtGNejDDHQL8sorrXtk+C2uGGgmoMpNu3cmxPFD8iF4mzosyMnz15I/k4P+28vIOcli83bRgzE/VW2G++dQ6WHO0S06RdCyi27p9DdPyis0w3OFlrR0FVCoB1iC6X7QvDUtjCdn4e5EeS3db6dWjARNMNKxN7ZCVy/JrxFRfIyQl4E8Z9pIYXewSGdITFkk1jwZLctHZpUXA==; bm_sv=19C307A772A043BC4FBCF20C9BA24EC9~YAAQDyozalKiVayNAQAAeOj3tRbKAK2gFjhsC+cyGFn+Nw2I54aqte07iFzS/3SARNu050d8QxIB0Gn5z9pBrTgsmNNcxojsJ5MQMAXFzNvX5e7TsAlFjmUYaeAvE39vXubwM4Q1g1YrvxyxX1YI9y/D/fnKQkwmQNU2FH400AvwYVgkV5DiPst0IUIfUEn1iBWK3j4XKQSkpwf+Nu43g/cFP+quW8d607fxVn5xn0yPLCWF00CWX6Bb9CzCyXakoVnu~1; RT="z=1&dm=nseindia.com&si=7a4effc2-2d74-4f95-9b2f-72a7b1bfbfac&ss=lspq3jy9&sl=9&se=8c&tt=coj&bcn=%2F%2F684d0d48.akstat.io%2F&ld=3qnh&nu=kpaxjfo&cl=3r2a&ul=4gna&hd=4gnw"; _ga_87M7PJ3R97=GS1.1.1708152812.5.1.1708153049.0.0.0; _ga_QJZ4447QD3=GS1.1.1708152812.3.1.1708153049.0.0.0; AKA_A2=A; ak_bmsc=6AEB52D26F589DC3ACB0342929E14FCC~000000000000000000000000000000~YAAQDyozahNnVayNAQAAwJzwtRbzwVkc4H5MySImQB5nhYTa3Xibi5FdRlBFKIOuQeRCsFndUnnC1ZVA8NVTMtc822/F+rqEx/ErVoIuS4ao2n1ZoTGsB16GvL/HPCKEoChgLXSKJkFdbvLv2m3nRNG5XDFHfqKbbxjtIov8dt6BR5+BN8MtGNejDDHQL8sorrXtk+C2uGGgmoMpNu3cmxPFD8iF4mzosyMnz15I/k4P+28vIOcli83bRgzE/VW2G++dQ6WHO0S06RdCyi27p9DdPyis0w3OFlrR0FVCoB1iC6X7QvDUtjCdn4e5EeS3db6dWjARNMNKxN7ZCVy/JrxFRfIyQl4E8Z9pIYXewSGdITFkk1jwZLctHZpUXA==; bm_sv=19C307A772A043BC4FBCF20C9BA24EC9~YAAQDyozalKiVayNAQAAeOj3tRbKAK2gFjhsC+cyGFn+Nw2I54aqte07iFzS/3SARNu050d8QxIB0Gn5z9pBrTgsmNNcxojsJ5MQMAXFzNvX5e7TsAlFjmUYaeAvE39vXubwM4Q1g1YrvxyxX1YI9y/D/fnKQkwmQNU2FH400AvwYVgkV5DiPst0IUIfUEn1iBWK3j4XKQSkpwf+Nu43g/cFP+quW8d607fxVn5xn0yPLCWF00CWX6Bb9CzCyXakoVnu~1',
      'referer': 'https://www.nseindia.com/',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    });

    return this.http.get(url, { headers });
  }
}
