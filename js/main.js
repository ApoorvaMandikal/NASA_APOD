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
        let pictures = response.data;
        let output = '';
        output = `
                    <div class ="well text-center">
                        <h5>${pictures.date}</h5>
                        <div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
                            <a onclick="pictureSelected('${pictures.date}')" href="#" >
                            <img src = '${pictures.hdurl}'>
                            </a>
                        </div>
                    </div>
            `;
        $('#picture').html(output);
    })
    .catch((err)=> {
        console.log(err);
    });
}

function pictureSelected(date){
    sessionStorage.setItem('picDate', date);
    window.location = 'picture.html';
    return false;
}

function getPicture(){
    let picDate = sessionStorage.getItem('picDate');

    axios.get('https://api.nasa.gov/planetary/apod?api_key='+apiKey+'&date='+picDate)
    .then((response)=>{
        console.log(response);
        let picture = response.data;
        $('#intro-date').html(picture.date);
        $('#title').html(picture.title)
        let output = '';
        output = `
                        <img src = '${picture.hdurl}'>
            `;
        $('#pictureExp').html(output);
        $('#copyright').html(picture.copyright);
        $('#explanation').html(picture.explanation);

    })
    .catch((err)=> {
        console.log(err);
    });
}