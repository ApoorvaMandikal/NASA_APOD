let apiKey = config.apiKey;

$(document).ready(()=> {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getPics(searchText);
        e.preventDefault();
    });
});

function getPics(searchText){
    axios.get('https://api.nasa.gov/planetary/apod?api_key='+apiKey+'&date='+searchText)
    .then((response)=>{
        console.log(response);
    })
    .catch((err)=> {
        console.log(err);
    })
}