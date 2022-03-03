var gamepads = null;

var axes = [];

var inputList = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

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

displayGamepads();

var waiting = null;

var buttonPressed = (nb, id) => {
    scangamepads();

    var gamepad = gamepads[nb];

    gamepad.buttons.forEach((button, index) => {

        if (button.pressed) {
            inputList[id] = "k"+index;

            document.querySelector("#input"+id+"key").innerText = index;

            clearInterval(waiting);
        }
    });

    gamepad.axes.forEach((axe, index) => {

        if (axes[index] != axe && Math.abs(axe) > .5) {

            var prec = "";

            if (axe < 0){
                prec = "-";
            }

            inputList[id] = "a" + index + prec;

            document.querySelector("#input"+id+"key").innerText = "axe" + index + prec;

            clearInterval(waiting);
        }
    });

    return false;
}


var setInput = (id) => {

    console.log("Waiting for input...");

    if (waiting) clearInterval(waiting);

    waiting = setInterval(() => {

        if (typeof gamepads[0] != "undefined") {
            
            buttonPressed(0, id);
        }
    }, 1/60);
}

var generateLink = () => {

    var link = "./layout.html?";

    if (inputList[0] != -1) link += "l=" + inputList[0] + "&";
    if (inputList[1] != -1) link += "u=" + inputList[1] + "&";
    if (inputList[2] != -1) link += "r=" + inputList[2] + "&";
    if (inputList[3] != -1) link += "d=" + inputList[3] + "&";

    if (inputList[4] != -1) link += "sp=" + inputList[4] + "&";
    if (inputList[5] != -1) link += "mp=" + inputList[5] + "&";
    if (inputList[6] != -1) link += "hp=" + inputList[6] + "&";

    if (inputList[7] != -1) link += "sk=" + inputList[7] + "&";
    if (inputList[8] != -1) link += "mk=" + inputList[8] + "&";
    if (inputList[9] != -1) link += "hk=" + inputList[9] + "&";

    if (inputList[10] != -1) link += "tp=" + inputList[10] + "&";
    if (inputList[11] != -1) link += "tk=" + inputList[11] + "&";

    document.querySelector("#tryLink").href = link.slice(0, -1);
    document.querySelector("#generatedLink").value = link.slice(0, -1);
    document.querySelector("#generatedLinkDiv").hidden = false;
}