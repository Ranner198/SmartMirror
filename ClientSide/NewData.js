    // News Data
    let newsIndex = 0;
    let newsRef = document.getElementById("News");
    let newsJsonData;
    function GatherNewsData() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {                
                newsJsonData = JSON.parse(this.responseText);
                NextArticle();
            }
            else if (this.readyState == 4 && this.status != 200)
            {
                newsJsonData = JSON.Parse(`{"articles":[{"source":{"id":null,"name":"err"},"author":null,"title":"Err in Webrequest Data","description":"Error in News Request"}]}`);
                NextArticle();
            }
        };
        xhttp.open("GET", "./News", true);
        xhttp.send();
    }
    function NextArticle()
    {
        newsRef.innerHTML = `<h1 style="margin: 0px;">${newsJsonData.articles[newsIndex].source.name}</h1><br><h2 style="padding-top: 5px; margin: 0px;">${newsJsonData.articles[newsIndex].title}</h2><br><h4 style="padding-bottom: 5px; margin: 0px;">${newsJsonData.articles[newsIndex].description}</h4>`;
        // Step through all new articles
        if (newsIndex+2 > newsJsonData.articles.length)
            newsIndex = 0;
        else
            newsIndex++;
    }