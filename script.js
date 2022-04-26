console.log("Welcome to Lusic");

// initialize the variables
let songIndex=0;//initially 0 songs will be played
let audioElement= new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');//range bar or seek bar
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songitems=Array.from(document.getElementsByClassName('songItem'));

let songs=[
  {songName:"Mera Mann",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
  {songName:"Kajra Mohabbat Wala",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
  {songName:"Kun Faya Kun",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
  {songName:"Chan Kittan",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
  {songName:"Jaan Nisar",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
  {songName:"What Makes You Beautiful",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
  {songName:"Aaftaab",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
]
//programatically we will change the song and its name
songitems.forEach((element,i)=>{ //The forEach() method calls a function for each element in an array.
  // console.log(element,i);
  element.getElementsByTagName("img")[0].src=songs[i].coverPath;
  element.getElementsByClassName("name")[0].innerText=songs[i].songName;
})
//audioElement.play();
// handle play/pause click
masterPlay.addEventListener('click',()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
     audioElement.play();
     masterPlay.classList.remove('fa-play-circle');
     masterPlay.classList.add('fa-pause-circle');
     gif.style.opacity=1;
   }
    else{
      audioElement.pause();
      masterPlay.classList.remove('fa-pause-circle');
      masterPlay.classList.add('fa-play-circle');
      gif.style.opacity=0;
    }
 })
//Listen events
 audioElement.addEventListener('timeupdate',()=>{ //shorthand notation of function() is ()=>
  //update range/seek bar
  progress=parseInt((audioElement.currentTime/audioElement.duration)*100); //% of song that has currently been played
  myProgressBar.value=progress;
 })
myProgressBar.addEventListener('change',()=>{
  audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
      element.classList.remove('fa-pause-circle');
      element.classList.add('fa-play-circle');
  })
}
//play the button adjacent to every songs
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    makeAllPlays();//there might be a song which was playing so this function will handle that
    // console.log(e.target);//gives the target element that is the play button
    songIndex=parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
     gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
  })
})
document.getElementById('next').addEventListener('click',()=>{
  if(songIndex>=6){
    songIndex=0;
  }
  else{
    songIndex+=1;
  }
  audioElement.src=`songs/${songIndex+1}.mp3`;
  masterSongName.innerText=songs[songIndex].songName;
  audioElement.currentTime=0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
  if(songIndex<=0){
    songIndex=0;
  }
  else{
    songIndex-=1;
  }
  audioElement.src=`songs/${songIndex+1}.mp3`;
  masterSongName.innerText=songs[songIndex].songName;
  audioElement.currentTime=0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
})
