//'onload' data

const category = ['business', 'technology', 'science', 'politics'];
var url = 'https://newsapi.org/v2/top-headlines?' +
          "category="+category[3]+"&" +
          'country=pl&' +
          'apiKey=7d3aa33090004b94aa83763a7c2730f1';


var des = document.querySelector('.description');
var grid = document.querySelector('.grid');

//getting NewsApi result

axios.get(url)
  .then(response => accessGranted(response))
  .catch(error => accessDenied(error));

function accessDenied(err) {
    console.error(err);
    des.innerHTML = err;
}

function accessGranted(result) {
    const data = result.data.articles;
    des.innerHTML = 'Oto najbardziej klikane nagłówki w Polsce: '

    data.forEach(item => {
        console.log(item.title);

        var title = item.title.substring(0, 45)+'...';
        var url = item.url;
        var img = item.urlToImage;

        //setting elements and text
        var itemParent = document.createElement("div");
        itemParent.classList.add('itemGrid');
        var itemGrid = document.createElement('div');
        itemGrid.classList.add('overlay');
        itemGrid.innerHTML = title;

        //setting styles
        itemParent.style.backgroundImage = "url("+img+")";
        itemParent.style.backgroundPosition = "30% 40%";

        //appending childs
        itemParent.appendChild(itemGrid);
        grid.appendChild(itemParent);
    });
}
