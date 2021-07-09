function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
  }
  
  BufferLoader.prototype.loadBuffer = function (url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
  
    var loader = this;
  
    request.onload = function () {
      // Asynchronously decode the audio file data in request.response
      loader.context.decodeAudioData(
        request.response,
        function (buffer) {
          if (!buffer) {
            alert("error decoding file data: " + url);
            return;
          }
          loader.bufferList[index] = buffer;
          if (++loader.loadCount == loader.urlList.length)
            loader.onload(loader.bufferList);
        },
        function (error) {
          console.error("decodeAudioData error", error);
        }
      );
    };
  
    request.onerror = function () {
      alert("BufferLoader: XHR error");
    };
  
    request.send();
  };
  
  BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i)
      this.loadBuffer(this.urlList[i], i);
  };
  
  //-----BufferLoader Code by others above-----------------//
  
  const pad = document.querySelectorAll(".drum-pads");
  const kickBtn = document.querySelector("#kick");
  const kickBoxes = document
    .querySelector("#kick-row")
    .querySelectorAll("input[type='checkbox']");
  const snareBoxes = document
    .querySelector("#snare-row")
    .querySelectorAll("input[type='checkbox']");
  const oHatBoxes = document
    .querySelector("#openHat-row")
    .querySelectorAll("input[type='checkbox']");
  const cHatBoxes = document
    .querySelector("#closedHat-row")
    .querySelectorAll("input[type='checkbox']");
  const rimBoxes = document
    .querySelector("#rim-row")
    .querySelectorAll("input[type='checkbox']");
  const clapBoxes = document
    .querySelector("#clap-row")
    .querySelectorAll("input[type='checkbox']");
  const frogBoxes = document
    .querySelector("#frog-row")
    .querySelectorAll("input[type='checkbox']");
  const kittyBoxes = document
    .querySelector("#kitty-row")
    .querySelectorAll("input[type='checkbox']");
  const hornBoxes = document
    .querySelector("#horn-row")
    .querySelectorAll("input[type='checkbox']");
  const powerBtn = document.querySelector("#power");
  const playBtn = document.querySelector("#play");
  const stopBtn = document.querySelector("#stop");
  const clearBtn = document.querySelector("#clear");
  const checkBoxes = document.querySelectorAll("input[type='checkbox']");
  const checkBoxesDiv = document.querySelectorAll(".checkbox-container");
  const metroBars = document.querySelectorAll(".metro-bar");
  //-----------------------DOM ABOVE-----------------------------//
  
  window.onload = init;
  let context;
  let bufferLoader;
  
  function init() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
  
    bufferLoader = new BufferLoader(
      context,
      [
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/kick.wav",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/snare.wav",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/closedHat.wav",
        "https://raw.githubusercontent.com/kucerajacob/DRUM-SEQUENCER/master/audio/rim.mp3",
        "https://raw.githubusercontent.com/kucerajacob/DRUM-SEQUENCER/master/audio/clap.mp3",
        "https://www.google.com/logos/fnbx/animal_sounds/frog.mp3",
        "https://res.cloudinary.com/jutzee/video/upload/v1534836204/FCC-drum-machine%20app/cat%20sound.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/HORN1.wav"
      ],
      finishedLoading
    );
  
    bufferLoader.load();
  }
  
  function finishedLoading(bufferList) {
    function playSound(value) {
      const sound = context.createBufferSource();
      if (value == "kick") {
        sound.buffer = bufferList[0];
      } else if (value == "snare") {
        sound.buffer = bufferList[1];
      } else if (value == "openHat") {
        sound.buffer = bufferList[2];
      } else if (value == "closedHat") {
        sound.buffer = bufferList[3];
      } else if (value == "rim") {
        sound.buffer = bufferList[4];
      } else if (value == "clap") {
        sound.buffer = bufferList[5];
      } else if (value == "frog") {
        sound.buffer = bufferList[6];
      } else if (value == "kitty") {
        sound.buffer = bufferList[7];
      } else if (value == "horn") {
        sound.buffer = bufferList[8];
      }
      sound.connect(context.destination);
      sound.start(0);
      //console.log(btnValue)
    }
    //-------------------DRUM MACHINE BELOW ------------------------------
    function buttonPressed(btnClick) {
      let button = btnClick.currentTarget;
      let btnValue = button.value;
      playSound(btnValue);
    }
  
    function keyPressed() {
      key = event.key;
      let soundValue;
      switch (key) {
        case "q":
          soundValue = "kick";
          break;
        case "w":
          soundValue = "snare";
          break;
        case "e":
          soundValue = "openHat";
          break;
        case "a":
          soundValue = "closedHat";
          break;
        case "s":
          soundValue = "rim";
          break;
        case "d":
          soundValue = "clap";
          break;
        case "x":
          soundValue = "frog";
          break;
        case "c":
          soundValue = "kitty";
           break;
        case "v":
          soundValue = "horn";
      }
      playSound(soundValue);
    }
    //---------------SOUND OBJECT BELOW ------------------------------
    //const kickArray = [false, false, false, false, false, false, false, false];
  
    const sequencerObj = {
      kick: {
        soundArray: [false, false, false, false, false, false, false, false],
        checkBoxArray: kickBoxes, //see tutorial looping thru all of sequencer objects at once
        soundFile: null,
        soundValue: "kick"
      },
      snare: {
        soundArray: [false, false, false, false, false, false, false, false],
        checkBoxArray: snareBoxes,
        soundFile: null,
        soundValue: "snare"
      },
      openHat: {
        soundArray: [false, false, false, false, false, false, false, false],
        checkBoxArray: oHatBoxes,
        soundFile: null,
        soundValue: "openHat"
      },
      closedHat: {
        soundArray: [false, false, false, false, false, false, false, false],
        checkBoxArray: cHatBoxes,
        soundFile: null,
        soundValue: "closedHat"
      },
      rim: {
        soundArray: [false, false, false, false, false, false, false, false],
        checkBoxArray: rimBoxes,
        soundFile: null,
        soundValue: "rim"
      },
      clap: {
        soundArray: [false, false, false, false, false, false, false, false],
        checkBoxArray: clapBoxes,
        soundFile: null,
        soundValue: "clap"
      },
      frog: {
        soundArray: [false, false, false, false, false, false, false, false],
        checkBoxArray: frogBoxes,
        soundFile: null,
        soundValue: "frog"
      },
      kitty: {
        soundArray: [false, false, false, false, false, false, false, false],
        checkBoxArray: kittyBoxes,
        soundFile: null,
        soundValue: "kitty"
      },
      horn: {
        soundArray: [false, false, false, false, false, false, false, false],
        checkBoxArray: hornBoxes,
        soundFile: null,
        soundValue: "horn"
      }  
    };
  
    //--------------------------MEAT AND POTATOES--------------------------------
    let firstObject = Object.values(sequencerObj)[0]; //Top level object inside larger oveall object sequencerObj
    let objectSoundArray = Object.values(firstObject.soundArray); //First array inside each top level object.       can also be written as Object.values(firstObject)[0];
    
    let objectSoundValue = firstObject.soundValue;
  
    function updateSoundArray(objectCheckBoxArray, objectSoundArray) {
      objectCheckBoxArray.forEach((element, index) => {
        objectSoundArray[index] = element.checked;
      });
    }
  
    let arrayPosition = 0;
  
    function moveThruArrays() { 
  
      Object.values(sequencerObj).forEach((val) => {
        if (val.soundArray[arrayPosition]){
          playSound(val.soundValue);
          //console.log(val);
        }
        let objectCheckBoxArray = val.checkBoxArray;
        visualPlayThru(objectCheckBoxArray);
        //console.log(val);
      });
  
      arrayPosition = arrayPosition + 1;
      
      console.log(`first object ${objectSoundArray}`);
      if (arrayPosition >= objectSoundArray.length) {
        arrayPosition = 0;
        //console.log("firing");
      }
    }
  
    function changeCheckBoxStyle(event) {
      const item = event.target;
      const target = item.parentElement;
      target.classList.toggle("checked");
    }
  
    const retrieveBPMValue = function () {
      const bpmInput = document.querySelector("#bpm");
      let bpmMiliseconds;
      bpmMiliseconds = 60000 / bpmInput.value;
      //console.log(`retrieveBPMValue ${bpmMiliseconds}`);
      return bpmMiliseconds;
      //return 100;
    };
  
    //--------------------------------VISUALS------------------------------------
    function visualPlayThru(objectCheckBoxArray){
      //console.log("visual play thru")
      let checkBoxDiv = objectCheckBoxArray[arrayPosition].parentElement;
      if (objectCheckBoxArray[arrayPosition].checked) {
        checkBoxDiv.classList.add("checked-playing");
      } else {
        checkBoxDiv.classList.add("unchecked-playing");
      }
      metroBars[arrayPosition].classList.add("metro-bar-playing")
      //console.log(`visual play thru ${arrayPosition}`)
      let indexBackOnePlace = (arrayPosition - 1);
      //console.log(`indexBackOnePlace ${indexBackOnePlace}`)
      if(arrayPosition > 0 ){
        let checkBoxDiv = objectCheckBoxArray[indexBackOnePlace].parentElement;
        checkBoxDiv.classList.remove("checked-playing", "unchecked-playing");
        metroBars[indexBackOnePlace].classList.remove("metro-bar-playing")
      } else {
        let pseudoIndex = objectCheckBoxArray.length -1;
        let checkBoxDiv = objectCheckBoxArray[pseudoIndex].parentElement;
        checkBoxDiv.classList.remove("checked-playing", "unchecked-playing");
        metroBars[pseudoIndex].classList.remove("metro-bar-playing")
      }
    };
   
    let count = 0;
    
    function visualPattern() {
      if (powered){
        let visualInterval = setInterval(function () {
            if (count < 4){
              visualPatternOne();
              count += 1;
            } else if (count >= 4 && count < 8) {
              visualPatternTwo();
              count += 1;
            } else if (count >= 8 && count <= 11) {
              visualPatternThree();
              count += 1;
            } else if (count >= 12 && count < 16) {
              visualPatternOne();
              count += 1;
            } else {
              clearInterval(visualInterval)
              console.log("stop visual run")
              count = 0;
            }
            console.log(count);
          }, 300);  
      } else {
        visualPatternFour();
      }
      
    };
    
    let visualBoxArray = Array.from(checkBoxesDiv); //CONVERT NODELIST OF checkBoxesDiv TO ARRAY FOR VISUAL PATTERN 01
      
    function visualPatternOne(){
         visualBoxArray.forEach((selected) => {
        selected.classList.toggle("powering-up-one")
      })
      };
     
     
    function visualPatternTwo(){
      let visualArrayTwo = [
    0, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 0,
    1, 1, 1, 0, 0, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 1, 1,
    1, 1, 1, 0, 0, 1, 1, 1,
    0, 1, 1, 0, 0, 1, 1, 0,
    0, 0, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 0
  ];
  
    for(let i = 0; i < visualArrayTwo.length; i++){
         if(visualArrayTwo[i] === 1){
           checkBoxesDiv[i].classList.toggle("powering-up-two");
         }
      }
    }
    
    
    function visualPatternThree(){
      let visualArrayThree = [
    1, 1, 1, 0, 0, 1, 1, 1,
    1, 0, 1, 0, 0, 1, 0, 1,
    1, 1, 1, 0, 0, 1, 1, 1,
    0, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 0,
    1, 1, 0, 0, 0, 0, 1, 1,
    1, 1, , 0, 0, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 1, 1, 1, 1, 0, 0
  ];
  
    for(let i = 0; i < visualArrayThree.length; i++){
         if(visualArrayThree[i] === 1){
           checkBoxesDiv[i].classList.toggle("powering-up-three");
         }
      }
    }
    
    function visualPatternFour(){
        visualBoxArray.forEach((selected) => {
       selected.classList.remove("powering-up-one")
     })
     };
    
    //------------------------------POWER-----------------------------------
    let powered = false; //default is off
    const buttonsNeedingPower = document.querySelectorAll(".needs-power");
    
    window.onload = disablePoweredButtonsOnLoad() 
    
    function disablePoweredButtonsOnLoad() {
      buttonsNeedingPower.forEach(button => button.disabled = true);
      checkBoxes.forEach(button => button.disabled = true);
    };
    
    function powerOnOff() {
      powered = !powered
      powerBtn.classList.toggle("powered")
      if (powered){ //if power is on, disable buttons
        buttonsNeedingPower.forEach(button => button.disabled = false);
        checkBoxes.forEach(button => button.disabled = false);
        console.log("turning on")
        
      } else { //if power is on do not disable buttons
        buttonsNeedingPower.forEach((element) => { 
        element.disabled = true;  
        }) 
        clear();
        stop();
        console.log("turning off")
      }
      visualPattern();
    }
   
    //--------------------------------START STOP CLEAR---------------------------
    let myInterval;
    let intervalValue;
    let sequencerRunning = false;
  
    function start() {
      intervalValue = retrieveBPMValue();
      if (sequencerRunning) {
        stop();
        start();
        return;
      } else {
        myInterval = setInterval(moveThruArrays, intervalValue);
        sequencerRunning = true;
      }
    }
  
    function stop() {
      clearInterval(myInterval);
      sequencerRunning = false;
      arrayPosition = 0;
      console.log("stopped");
    }
    
    function clear(){
      //-------------------CLEAR ACTUAL CHECKBOXES----------------------
      const checkedBoxes = document.querySelectorAll(
        "input[type='checkbox']:checked"
      );
      checkedBoxes.forEach((checkBox) => {
        checkBox.checked = false;
      });
      
      Object.values(sequencerObj).forEach((val) => {
        val.soundArray.forEach((element, index) => {
          val.soundArray[index] = false;
          //console.log(val);
        })
      
        //console.log(val);
      });
      
   //--------------------CLEAR PSEUDO BOXES-----------------
      checkBoxesDiv.forEach((divBox) => {
        divBox.classList.remove(
          "checked",
          "checked-playing",
          "unchecked-playing"
        );
      });

      //---------------------------CLEAR METRONOME-------------
      metroBars.forEach((metroBar) => {
        metroBar.classList.remove("metro-bar-playing")
      })  
    }
    
    // --------------------------------BUTTON CONTROLS----------------------------
    pad.forEach((pad) => pad.addEventListener("click", buttonPressed));
  
    window.addEventListener("keydown", keyPressed);
  
    powerBtn.addEventListener("click", powerOnOff);
    
    playBtn.addEventListener("click", start);
  
    stopBtn.addEventListener("click", stop);
    
    clearBtn.addEventListener("click", clear);
  
    checkBoxes.forEach((checkBox) =>
      checkBox.addEventListener("change", () => {
        changeCheckBoxStyle(event);
        let selectedInstrument = sequencerObj[event.currentTarget.value];
        updateSoundArray(selectedInstrument.checkBoxArray, selectedInstrument.soundArray);
        //console.log(event.currentTarget.value);
        //console.log(sequencerObj[event.currentTarget.value]);
      })
    );
  
    //-----------------------------------BUTTON CONTROL ABOVE
  } //End of function finishedLoading(bufferList) YOU NEED THIS.
  