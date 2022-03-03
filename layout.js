var gamepads = [];
var lastInput = [];
var newInput = [];
var axes = [];

var keys = ["k14", "k12", "k15", "k13", "k2", "k3", "k5", "k0", "k1", "k7", "k4", "k6"];

var removeFromArray = (val) => {
    keys[keys.indexOf(val)] = -1;
}

var initialize = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    var newKey = -1;

    if (urlParams.has("l")){
        newKey = /*parseInt*/(urlParams.get("l"));
        removeFromArray(newKey); 
        keys[0] = /*parseInt*/(urlParams.get("l"));
    }

    if (urlParams.has("u")){ 
        newKey = /*parseInt*/(urlParams.get("u"));
        removeFromArray(newKey); 
        keys[1] = /*parseInt*/(urlParams.get("u"));
    }

    if (urlParams.has("r")){ 
        newKey = /*parseInt*/(urlParams.get("r"));
        removeFromArray(newKey); 
        keys[2] = /*parseInt*/(urlParams.get("r"));
    }
    
    if (urlParams.has("d")){ 
        newKey = /*parseInt*/(urlParams.get("d"));
        removeFromArray(newKey); 
        keys[3] = /*parseInt*/(urlParams.get("d"));
    }

    if (urlParams.has("sp")){ 
        newKey = /*parseInt*/(urlParams.get("sp"));
        removeFromArray(newKey); 
        keys[4] = /*parseInt*/(urlParams.get("sp"));
    }

    if (urlParams.has("mp")){ 
        newKey = /*parseInt*/(urlParams.get("mp"));
        removeFromArray(newKey); 
        keys[5] = /*parseInt*/(urlParams.get("mp"));
    }

    if (urlParams.has("hp")){ 
        newKey = /*parseInt*/(urlParams.get("hp"));
        removeFromArray(newKey); 
        keys[6] = /*parseInt*/(urlParams.get("hp"));
    }

    if (urlParams.has("sk")){ 
        newKey = /*parseInt*/(urlParams.get("sk"));
        removeFromArray(newKey); 
        keys[7] = /*parseInt*/(urlParams.get("sk"));
    }

    if (urlParams.has("mk")){ 
        newKey = /*parseInt*/(urlParams.get("mk"));
        removeFromArray(newKey); 
        keys[8] = /*parseInt*/(urlParams.get("mk"));
    }

    if (urlParams.has("hk")){ 
        newKey = /*parseInt*/(urlParams.get("hk"));
        removeFromArray(newKey); 
        keys[9] = /*parseInt*/(urlParams.get("hk"));
    }

    if (urlParams.has("tp")){ 
        newKey = /*parseInt*/(urlParams.get("tp"));
        removeFromArray(newKey); 
        keys[10] = /*parseInt*/(urlParams.get("tp"));
    }

    if (urlParams.has("tk")){ 
        newKey = /*parseInt*/(urlParams.get("tk"));
        removeFromArray(newKey); 
        keys[11] = /*parseInt*/(urlParams.get("tk"));
    }
};

initialize();


var displayGamepads = () => {

    gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

    if (!gamepads)
        return;

    console.log(gamepads);
}

function scangamepads() {
    gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
}

window.addEventListener("gamepadconnected", (event) => {
    console.log("Gamepad connected");
    scangamepads();
    axes = gamepads[0].axes;
});

window.addEventListener("gamepaddisconnected", (event) => {
    console.log("Gamepad disconnected");
});


function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function isPressed(key){
    if (key[0] != "a" && key[0] != "-"){

    }
}

var checkChanges = (nb) => {
    scangamepads();

    var gamepad = gamepads[nb];

    gamepad.buttons.forEach((button, index) => {
        if (button.pressed) {
            newInput.push("k"+index);
        }
    });

    gamepad.axes.forEach((axe, index) => {
        if (axes[index] != axe && Math.abs(axe) > .5) {

            var prec = "";

            if (axe < 0){
                prec = "-";
            }

            newInput.push("a" + index + prec);

        }
    });
}

var displayInputs = () => {

    if (typeof newInput != 'undefined' && !arrayEquals(lastInput, newInput))
    {
        if (newInput.length > 0){

            var newLine = document.createElement('in');

            var move = document.createElement('move');

            if (newInput.includes(keys[0])) {
                move.classList.add('left');
            }

            if (newInput.includes(keys[1])) {
                move.classList.add('up');
            }

            if (newInput.includes(keys[2])) {
                move.classList.add('right');
            }

            if (newInput.includes(keys[3])) {
                move.classList.add('down');
            }
            
            if (move.classList.length > 0)
            {
                newLine.append(move);
            }

            if (newInput.includes(keys[10])) {
                
                var newHit = document.createElement('hit');
                newHit.classList.add('sp');
                newLine.append(newHit);
                var newHit = document.createElement('hit');
                newHit.classList.add('mp');
                newLine.append(newHit);
                var newHit = document.createElement('hit');
                newHit.classList.add('hp');
                newLine.append(newHit);
            }
            else {
                
                if (newInput.includes(keys[4])) {
                    var newHit = document.createElement('hit');
                    newHit.classList.add('sp');
                    newLine.append(newHit);
                }

                if (newInput.includes(keys[5])) {
                    var newHit = document.createElement('hit');
                    newHit.classList.add('mp');
                    newLine.append(newHit);
                }

                if (newInput.includes(keys[6])) {
                    var newHit = document.createElement('hit');
                    newHit.classList.add('hp');
                    newLine.append(newHit);
                }
            }

            if (newInput.includes(keys[11])) {
                
                var newHit = document.createElement('hit');
                newHit.classList.add('sk');
                newLine.append(newHit);
                var newHit = document.createElement('hit');
                newHit.classList.add('mk');
                newLine.append(newHit);
                var newHit = document.createElement('hit');
                newHit.classList.add('hk');
                newLine.append(newHit);
            }
            else {

                if (newInput.includes(keys[7])) {
                    var newHit = document.createElement('hit');
                    newHit.classList.add('sk');
                    newLine.append(newHit);
                }

                if (newInput.includes(keys[8])) {
                    var newHit = document.createElement('hit');
                    newHit.classList.add('mk');
                    newLine.append(newHit);
                }

                if (newInput.includes(keys[9])) {
                    var newHit = document.createElement('hit');
                    newHit.classList.add('hk');
                    newLine.append(newHit);
                }
            }

            document.querySelector('inputs').insertBefore(newLine, document.querySelector('inputs').firstChild);
        }

        lastInput = newInput;
    }

    newInput = [];
}

var clearOverflow = () => {
    var inputsDiv = document.querySelector('inputs');
    var body = document.querySelector('body');

    while (body.clientHeight > screen.height){
        inputsDiv.removeChild(inputsDiv.lastChild);
    }
}

var loop = () => {

    setInterval(() => {

        if (typeof gamepads[0] !== "undefined"){
        
            checkChanges(0);
            displayInputs();
            clearOverflow();
        }
    }, 1/60);
}

loop();