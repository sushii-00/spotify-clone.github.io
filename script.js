// alert("Working!");

// Initialise the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");

let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "SICKO MODE (ft. Drake)", filePath:"songs/1.mp3", coverPath: "covers/Astroworld_by_Travis_Scott.jpg"},
    {songName: "can't say", filePath:"songs/2.mp3", coverPath: "covers/Astroworld_by_Travis_Scott.jpg"},
    {songName: "No Bystanders", filePath:"songs/3.mp3", coverPath: "covers/Astroworld_by_Travis_Scott.jpg"},
    {songName: "R.I.P. SCREW", filePath:"songs/4.mp3", coverPath: "covers/Astroworld_by_Travis_Scott.jpg"},
    {songName: "Carousel", filePath:"songs/5.mp3", coverPath: "covers/Astroworld_by_Travis_Scott.jpg"},
    {songName: "Butterfly Effect", filePath:"songs/6.mp3", coverPath: "covers/Astroworld_by_Travis_Scott.jpg"},
    {songName: "Skeletons", filePath:"songs/7.mp3", coverPath: "covers/Astroworld_by_Travis_Scott.jpg"},
    {songName: "STARGAZING", filePath:"songs/8.mp3", coverPath: "covers/Astroworld_by_Travis_Scott.jpg"},
    {songName: "Stop Trying To Be God", filePath:"songs/9.mp3", coverPath: "covers/Astroworld_by_Travis_Scott.jpg"},
    {songName: "YOSEMITE (ft. Gunna & NAV)", filePath:"songs/10.mp3", coverPath: "covers/Astroworld_by_Travis_Scott.jpg"},
]

//to update the cover
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

//Handle play/pause click

masterPlay.addEventListener('click', function(){
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play(); 
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause(); 
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})



//listen to events

audioElement.addEventListener('timeupdate', ()=>{
    

    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);

    myProgressBar.value = progress;
})

//if the seekbar is changed, the audio must update

myProgressBar.addEventListener('change', ()=>{
    const progressBarValue = parseFloat(myProgressBar.value); // Ensure the value is a number
    if (!isNaN(progressBarValue) && isFinite(progressBarValue)) {
        const newTime = (progressBarValue * audioElement.duration) / 100;
        audioElement.currentTime = newTime;
    }
})

// to make songs play from the list and not only from the toggle bar at the bottom

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        idTemp = e.target.id;
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        
        // masterPlay.innerText = songs[songIndex].songName;
        ele = document.getElementById("masterSongName");
        ele.innerText = songs[songIndex].songName;
        audioElement.addEventListener("loadedmetadata", function () {
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        });
    });
});
document.getElementById('next').addEventListener('click' , ()=>{
    console.log(idTemp);
    if(songIndex>=9){
        songIndex = 0;
    }

    else{
        songIndex+=1;
    }

    audioElement.src = `songs/${songIndex+1}.mp3`;
        
    // masterPlay.innerText = songs[songIndex].songName;
    ele = document.getElementById("masterSongName");
    ele.innerText = songs[songIndex].songName;
    makeAllPlays();
    audioElement.addEventListener("loadedmetadata", function () {
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    });
})

document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex<0){
        songIndex = 0;
    }

    else{
        songIndex-=1;
    }

    audioElement.src = `songs/${songIndex+1}.mp3`;
        
    // masterPlay.innerText = songs[songIndex].songName;
    ele = document.getElementById("masterSongName");
    ele.innerText = songs[songIndex].songName;
    makeAllPlays();
    audioElement.addEventListener("loadedmetadata", function () {
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
})


