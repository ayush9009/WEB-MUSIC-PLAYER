//const music_container=document.querySelector(".music_container");
const music=document.querySelector("audio");
const img=document.querySelector("img");
const play=document.getElementById("play");
const artist=document.getElementById("artist");
const title=document.getElementById("title");
const prev=document.getElementById("previous");
const next=document.getElementById("next");
//musicList=music_container.querySelector(".music-list");
//showMoreBtn=music_container.querySelector("#more-music");
//hideMusicBtn=musicList.querySelector("#close");




let progress=document.getElementById("progress"); 
let total_duration=document.getElementById("duration");
let current_time=document.getElementById("current_time");
const progress_div=document.getElementById("progress_div");
const songs=[
    {
        name:"1",
        title:"Tu aake dekhle",
        artist:"King",
    },
    {
        name:"2",
        title:"Let Me love you",
        artist:"Justin Bieber",
    },
    {
        name:"3",
        title:"Bahu kale Ki",
        artist:"Ajay Hooda",
    },
    {
        name:"4",
        title:"Lover",
        artist:"Diljit Dosanjh",
    },
    {
        name:"5",
        title:"jattiye ni",
        artist:"Jordhan Sandhu",
    },
    {
        name:"6",
        title:"Blue Eyes",
        artist:"Yo Yo Honey Singh",
    },
    {
        name:"7",
        title:"slow slow",
        artist:"Badshah",
    },
    {
        name:"8",
        title:"Faded",
        artist:"Alan Walker",
    },
    {
        name:"9",
        title:"Phulkari",
        artist:"Karan Randhawa",
    },
    {
        name:"10",
        title:"Rockstar",
        artist:"Post Malone",
    }
];
let isPlaying=true;
//for play function
const playMusic=()=>{
    isPlaying=true;
    music.play();
    play.classList.replace("fa-play","fa-pause");
    img.classList.add("anime");
};
//for pause function
const pauseMusic=()=>{
    isPlaying=false;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
    img.classList.remove("anime");
};
play.addEventListener("click",()=>{
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
});

//change the music data
const loadSong=(songs)=>{
    title.textContent=songs.title;
    artist.textContent=songs.artist;
    //music.src="music/"+songs.name+".mp3";
    music.src=`music/${songs.name}.mp3`;
    img.src="images/"+songs.name+".jpg";
};
songIndex=0;
const prevSong=()=>{
    songIndex=(songIndex-1 + songs.length)% songs.length;          //jaise circular queue mai karre thai left aur right ko incremnt
    console.log('song index ' + songIndex);
    loadSong(songs[songIndex]);
    playMusic();
};
const nextSong=()=>{
    songIndex=(songIndex+1)%songs.length;             //jaise circular queue mai karre thai left aur right ko incremnt
    loadSong(songs[songIndex]);
    playMusic();
};
// progress js work
music.addEventListener("timeupdate",(event)=>{
    //console.log(event);
    const {currentTime,duration}=event.srcElement;

    let progress_time=(currentTime/duration)*100;
    progress.style.width=`${progress_time}%`;
    //music duration update
    let min_duration=Math.floor(duration/60);
    let sec_duration=Math.floor(duration%60);

    let tot_duration=`${min_duration}:${sec_duration}`;
    if(duration){
        total_duration.textContent=`${tot_duration}`;
    }
    //current duration update
    let min_currentTime=Math.floor(currentTime/60);
    let sec_currentTime=Math.floor(currentTime%60);

    if(sec_currentTime<10)
    {
        sec_currentTime=`0${sec_currentTime}`;
    }
    let tot_currentTime=`${min_currentTime}:${sec_currentTime}`;
    current_time.textContent=`${tot_currentTime}`;
});
//progress on click funnctionality
progress_div.addEventListener('click',(event)=>{
    console.log(event);
    const{duration}=music;
    let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration;
    music.currentTime=move_progress;
});
//if music end call next song function
music.addEventListener("ended",nextSong);
next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);
//const repeatBtn=music_container.querySelector("#repeat-plist");
//repeatBtn.addEventListener("click",()=>{
  //  let getText=repeatBtn.innerText;
    //switch(getText){
      //  case "repeat":
        //    repeatBtn.innerText="repeat-one";
          //  repeatBtn.setAttribute("title","Song looped");
            //break;
        //case "repeat_one":
          //  repeatBtn.innerText="shuffle";
            //repeatBtn.setAttribute("title","Playback shuffled");
            //break;
        //case "shuffle":
          //  repeatBtn.innerText="repeat";
            //repeatBtn.setAttribute("title","Playlist looped");
            //break;
   // }
//});
//showMoreBtn.addEventListener("click",()=>{
  //  musicList.classList.toggle("show");
//});
//hideMusicBtn.addEventListener("click",()=>{
  //  showMoreBtn.click();
//});
//const ulTag=music_container.querySelector("ul");
//for(let i=0;i<songs.length;i++){
   // let liTag=`<li li-index="${i+1}`>
     //          <div class="row">
       //            <span>${songs[i].name}</span>
         //          <p>${songs[i].artist}</p>
           //    </div>
             //  <span id="${songs[i].src}" class="audio-duration">2:40</span>
               //<audio class="${songs[i].src}" src=music/${songs[i].src}.mp3"></audio>
               //</li>`;
    //ulTag.insertAdjacentHTML("beforeend",liTag);
    //let liAudioDurationTag=ulTag.querySelector(`#${songs[i].src}`);
    //liAudioTag.addEventListener("loadeddata",()=>{
      //  let duration=liAudioTag.duration;
        //let totalMin=Math.floor(duration/60);
        //let totalSec=Math.floor(duration%60);
       // if(totalSec<10){
         //   totalSec=`0${totalSec}`;
        //};
        //liAudioDurationTag.innerText=`${totalMin}:${totalSec}`;
        //liAudioDurationTag.setAttribute("t-duration",`${totalMin}:${totalSec}`);
    //});
//}
//function playingSong(){
  //const allLiTag = ulTag.querySelectorAll("li");
  
  //for (let j = 0; j < allLiTag.length; j++) {
    //let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    //if(allLiTag[j].classList.contains("playing")){
      //allLiTag[j].classList.remove("playing");
      //let adDuration = audioTag.getAttribute("t-duration");
      //audioTag.innerText = adDuration;
    //}
    //if the li tag index is equal to the musicIndex then add playing class in it
    //if(allLiTag[j].getAttribute("li-index") == musicIndex){
      //allLiTag[j].classList.add("playing");
      //audioTag.innerText = "Playing";
    //}
    //allLiTag[j].setAttribute("onclick", "clicked(this)");
  //}
//}
//particular li clicked function
//function clicked(element){
  //let getLiIndex = element.getAttribute("li-index");
  //musicIndex = getLiIndex; //updating current song index with clicked li index
  //loadMusic(musicIndex);
  //playMusic();
  //playingSong();
//}

