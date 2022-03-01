let apiKey = config.apiKey;


$(document).ready(()=> {
    $("#searchText").datepicker({
        format: 'yyyy-mm-dd',
        startDate: '1995-06-16',
        endDate: '+0d',
        autoclose: true
    }).on("changeDate", function (e) {
        $("#searchForm").submit();
    });
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
        let media_type = pictures.media_type;
        let output = '';
        picoutput = `
                    <div class ="well text-center">
                        <h5>${pictures.date}</h5>
                        <div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
                            <a onclick="pictureSelected('${pictures.date}')" href="#" >
                            <img src = '${pictures.hdurl}'>
                            </a>
                        </div>
                    </div>
            `;
        vidoutput = `
                    <div class ="well text-center">
                        <h5>${pictures.date}</h5>
                        <div>
                            <iframe
                                class="shadow-1-strong rounded"
                                src='${pictures.url}'
                                title="YouTube video"
                                height="500" width="1000"
                                allowfullscreen>
                            </iframe>
                            <p class="text-muted mb-2">
                                Explanation: 
                            </p>
                            <p>${pictures.explanation}</p>
                        </div>
                    </div>
            `;
        if(media_type == "image" ){
            $('#picture').html(picoutput);
        }
        else $('#picture').html(vidoutput);
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