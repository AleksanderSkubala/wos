//'onload' data

var url = 'https://newsapi.org/v2/everything?'+
           'q=strajk&'+    //searching query
           'from=2019-01-05&'+   //from date
           'sortBy=popularity,relevancy&'+    //sortBy
           'apiKey=7d3aa33090004b94aa83763a7c2730f1';    //apiKey


var des = document.querySelector('.description');
var grid = document.querySelector('.grid');

//getting NewsApi result
getResponse(url);

function getResponse(surl){
    axios.get(surl)
    .then(response => accessGranted(response))
    .catch(error => accessDenied(error));
}

function accessDenied(err) {
    console.error(err);
    des.innerHTML = err;
}

function accessGranted(result) {
    const data = result.data.articles;
    des.innerHTML = 'Oto najbardziej klikane nagłówki w Polsce: '

    data.forEach(item => {
        console.log(item.title);

        var title = '<b>'+item.title.substring(0, 35)+'...</b>';
        var description = item.description.substring(0, 45)+'...';
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