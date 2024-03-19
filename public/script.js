const numberConstants = ["znaky", "lekce", "chyby", "opsano", "bold-rychlost", "bold-limitrychlost", "bold-chybovost", "bold-limitchybovost", "datum", "casovylimit", "jmeno", "celkovycas"]


function preLoad() {
    a1 = new Image; a1.src = "resources/!template.png"
    a2 = new Image; a2.src = "resources/!template2.png"

    save()    

    document.getElementById("casovylimit").style.visibility = "hidden";
    document.getElementById("casovylimitText").style.visibility = "hidden";
    document.getElementById("casovylimitText1").style.visibility = "hidden";

}
function im(image) {
    document.getElementById(image[0]).src = eval(image + ".src")

    if (image == "a1") {
        document.getElementById("lekce").style.visibility = "visible";
        document.getElementById("lekceText").style.visibility = "visible";
        document.getElementById("lekce").value = localStorage.getItem("lekce")
        document.getElementById("casovylimit").style.visibility = "hidden";
        document.getElementById("casovylimitText").style.visibility = "hidden";
        document.getElementById("casovylimitText1").style.visibility = "hidden";
        document.getElementById("casovylimit").value = ""

    }
    else {
        document.getElementById("lekce").style.visibility = "hidden";
        document.getElementById("lekceText").style.visibility = "hidden";
        document.getElementById("lekce").value = ""
        document.getElementById("casovylimit").style.visibility = "visible";
        document.getElementById("casovylimitText").style.visibility = "visible";
        document.getElementById("casovylimitText1").style.visibility = "visible";
        document.getElementById("casovylimit").value = localStorage.getItem("casovylimit")
    }
}

function save() {
    for (let i = 0; i<numberConstants.length; i++) {
        let item = localStorage.getItem(numberConstants[i])
        document.getElementById(numberConstants[i]).value = item
    }
}

document.getElementById("submit").addEventListener("click", () => {
    for (let i = 0; i < numberConstants.length; i++) {
        const container = document.querySelector(`.${numberConstants[i]}-container`);
        console.log(container)
        container.innerHTML = "";
        console.log(document.getElementById(numberConstants[i]))
        const znaky = (document.getElementById(numberConstants[i]).value).replace(",", ".")
        localStorage.setItem(numberConstants[i], znaky)
        console.log(znaky)
        for (let j = 0; j < znaky.length; j++) {
            let img = document.createElement("img");
            img.src = `resources/${znaky[j] == "." ? "dot" : znaky[j] == " " ? "blank" : znaky[j] == ":" ? "dvojtecka" : (znaky[j] === znaky[j].toUpperCase() && znaky[j] !== znaky[j].toLowerCase()) ? "_"+znaky[j].toUpperCase() : znaky[j]}${numberConstants[i].startsWith("bold-") ? "bold" : ""}.png`
            console.log(img.src)
            container.appendChild(img);
        }
    }
})

const submit = document.querySelector("#values")
console.log(submit)

submit.addEventListener("click", (e) => {
    e.preventDefault();
})


document.getElementById("takeScreenshot").addEventListener("click", (e) => {

    e.preventDefault()

    const finalDiv = document.querySelector('.final');
    //const canvas = document.getElementById('screenshotCanvas');

    // const canvas = document.createElement("canvas")
    // canvas.width = finalDiv.offsetWidth;
    // canvas.height = finalDiv.offsetHeight;

    // const context = canvas.getContext('2d');
    // context.drawWindow(window, 0, 0, canvas.width, canvas.height, 'rgb(255, 255, 255)');

    console.log(finalDiv)
    html2canvas(finalDiv).then(canvas => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'screenshot.png';
        link.click();
    })
})
