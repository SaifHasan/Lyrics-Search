function search() {
    const searchText = document.getElementById('textField').value;

    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(jsdata => {
            //let Html = "";
            if (jsdata.data) {
                jsdata.data.forEach(element => {
                    console.log(element);
                    const songDiv = document.createElement('div');
                    songDiv.className = `single-result row align-items-center my-3 p-3`;
                    songDiv.innerHTML += `
                            <div class="col-md-9">
                                <h3 class="lyrics-name">${element.title}</h3>
                                <p class="author lead">Album by <span>${element.album.title}</span></p>
                                <br />
                                <audio controls><source src="${element.preview}" type="audio/mpeg"></audio>
                            </div>
                            
                            <div class="col-md-3 text-md-right text-center">
                                <button  onclick="findLyrics('${element.artist.name}','${element.title}')" class="btn btn-success">Get Lyrics</button>
                            </div>
                            `
                    const display = document.getElementById('display');
                    display.appendChild(songDiv);

                })
            }

        })

}

const findLyrics = (artist, title) => {

    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
        .then(res => res.json())
        .then(data => getLyrics(data.lyrics))

}

const getLyrics = (lyricss) => {


    const findLyrics = document.getElementById('findLyrics')
    const resuitLyrics = document.createElement('div');
    resuitLyrics.className = 'lyricsOutput';
    resuitLyrics.innerText = lyricss;
    findLyrics.appendChild(resuitLyrics)

}


//  console.log(element);
// const songDiv = document.createElement('div');
// songDiv.className = `single-result row align-items-center my-3 p-3`;
// songDiv.innerHTML += `

// <div class="col-md-9">
//     <h3 class="lyrics-name">${element.title}</h3>
//     <p class="author lead">Album by <span>${element.album.title}</span></p>
// </div>
// <div class="col-md-3 text-md-right text-center">
//     <button class="btn btn-success">Get Lyrics</button>
// </div>
// `
// const display = document.getElementById('display');
// display.appendChild(songDiv);