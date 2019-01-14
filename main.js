//'onload' data

const categories = ['business', 'technology', 'science']
var everything = 'https://newsapi.org/v2/everything?'+
           'q=polityka&'+    //searching query
           'from=2019-01-05&'+   //from date
           'sortBy=popularity,relevancy&'+    //sortBy
           'apiKey=7d3aa33090004b94aa83763a7c2730f1';    //apiKey

var th = 'https://newsapi.org/v2/top-headlines?'+
           'country=pl&'+    //country
           'category=politics&'+   //category
           'apiKey=7d3aa33090004b94aa83763a7c2730f1';    //apiKey

var thEmpty = 'https://newsapi.org/v2/top-headlines?'+
           'country=pl&'+    //country
           'apiKey=7d3aa33090004b94aa83763a7c2730f1&'+    //apiKey
           'category=';   //category


var des = document.querySelector('.description');
var grid = document.querySelector('.grid');
var descriptionText = 'Oto najbardziej klikane nagłówki w Polsce:';

//getting NewsApi result
getResponse(th); //<-auto loaded

function getResponse(q){
    grid.innerHTML = '';

    (q===everything) ? descriptionText = 'Oto artykuły o polityce z przed tygodnia:' :
    (q===th) ? descriptionText = 'Oto najbardziej klikane nagłówki w Polsce:' :
    (q===thEmpty+categories[0]) ? descriptionText = 'Oto artykuły o biznesie z przed tygodnia:' :
    (q===thEmpty+categories[1]) ? descriptionText = 'Oto artykuły o technologii z przed tygodnia:' :
    (q===thEmpty+categories[2]) ? descriptionText = 'Oto artykuły o nauce z przed tygodnia:' : '';


    axios.get(q)
    .then(response => accessGranted(response))
    .catch(error => accessDenied(error));
}

function accessDenied(err) {
    console.error(err);
    des.innerHTML = err;
}

function accessGranted(result) {
    const data = result.data.articles;
    des.innerHTML = descriptionText;

    data.forEach(item => {
        var title = '<b>'+item.title.substring(0, 35)+'...</b>';
        var description = (item.description && item.description!='&nbsp;') ? item.description.substring(0, 45)+'...' : '';
        var url = item.url;
        var img = item.urlToImage;

        //setting elements and text
        var itemParent = document.createElement("div");
        itemParent.classList.add('itemGrid');
        var itemGrid = document.createElement('div');
        itemGrid.classList.add('overlay');
        itemGrid.innerHTML = title+'<br/>'+description;

        //setting styles
        itemParent.style.backgroundImage = "url("+img+")";

        //setting event listeners
        itemParent.addEventListener("click", ()=>{
            window.location = url;
        });

        //appending childs
        itemParent.appendChild(itemGrid);
        grid.appendChild(itemParent);
    });
}