const music=document.querySelector("audio");
const img=document.querySelector("img");
const play=document.getElementById("play");
const artist=document.getElementById("artist");
const title=document.getElementById("title");
const prev=document.getElementById("previous");
const next=document.getElementById("next");

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
        title:"Dheere Dheere",
        artist:"Kumar Sanu",
    },
    {
        name:"3",
        title:"Bahu kale Ki",
        artist:"Ajay Hooda",
    },
    {
        name:"4",
        title:"Excuses",
        artist:"Ap Dhillon",
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
        title:"Punjabiyan Di",
        artist:"Guru Randhawa",
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
    },
    {
        name:"11",
        title:"Ankhon Ankhon",
        artist:"Udit Narayan",
    },
    {
        name:"12",
        title:"One Bottle Down",
        artist:"Justin Bieber",
    },
    {
        name:"13",
        title:"Chaar Bottle Vodka",
        artist:"Yo Yo Honey Singh",
    },
    {
        name:"14",
        title:"Let Me love You",
        artist:"Justin Bieber",
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
    if(sec_duration<10)
    {
        sec_duration=`0${sec_duration}`;
    } 

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
    //console.log(event);
    const{duration}=music;
    let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration;
    music.currentTime=move_progress;
});
//if music end call next song function
music.addEventListener("ended",nextSong);
next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);
