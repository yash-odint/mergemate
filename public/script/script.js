const form = document.querySelector('form');
const input_file = document.querySelector(".input-file");
const progressArea = document.querySelector(".progress-area");
const uploadArea = document.querySelector(".uploaded-area");
const submit_btn = document.querySelector(".submit-btn");

form.addEventListener("click", ()=>{
    input_file.click();
});

input_file.onchange = ({target}) => {
    let file = target.files[0];
    if(file){
        let fileName = file.name;
        if(fileName.length >= 12){
            fileName = fileName.substring(0,12);
        }
        uploadFile(fileName);
    }
};

function uploadFile(fileName){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/upload");
    xhr.upload.addEventListener("progress",({loaded, total})=>{
        let fileLoaded = Math.floor(loaded/total * 100);
        let fileTotal = Math.floor(total/1000); // in KB
        console.log(fileLoaded + "  " + fileTotal);
        let progressHTML = `<li class="row">
                                <i class="fas fa-file-alt"></i>
                                <div class="content">
                                    <div class="details">
                                        <span class="name">${fileName}- Uploading</span>
                                        <span class="percent">${fileLoaded}%</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress" style="width: ${fileLoaded}%"></div>
                                    </div>
                                </div>
                            </li>`;
        progressArea.innerHTML = progressHTML;
        if(loaded == total){
            let uploadedHTML = `<li class="row">
                                <div class="content">
                                    <i class="fas fa-file-alt"></i>
                                    <div class="details">
                                        <span class="name">${fileName} - Uploaded</span>
                                        <span class="size">${fileTotal}KB</span>
                                        <div class="pages">
                                            <span>Start:</span>
                                            <input type="text" class="page-start page-box">
                                            <span>End:</span>
                                            <input type="text" class="page-end page-box">
                                        </div>
                                    </div>
                                </div>
                                <i class="fas fa-check"></i>
                            </li>`;
            uploadArea.insertAdjacentHTML("afterbegin", uploadedHTML);
        }
    });

    
    let formData = new FormData(form);
    xhr.send(formData);
}


// submit_btn.addEventListener("click", ()=>{

//     const pg_start = document.getElementsByClassName("page-start");
//     const pg_end = document.getElementsByClassName("page-end");

//     console.log(pg_start);
//     console.log(pg_end);

//     // var xmlHttp = new XMLHttpRequest();
//     // xmlHttp.open( "GET", "http://localhost:8080/merge", false ); // false for synchronous request
//     // xmlHttp.send( null );
// });