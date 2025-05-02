const AddButton = document.getElementById("add");
let Contetns = [];
let lastIndex = 0;

const load = localStorage.getItem("subjects");
if (load) {
    const loadedObjects = JSON.parse(load);
    loadedObjects.forEach(element => {
        CreateObject(element.subject, element.checked);
    });
    Contetns = loadedObjects;
} else {
    console.log("VERİ BULUNAMADI");
}

function save() {
    localStorage.setItem("subjects", JSON.stringify(Contetns));
}

AddButton.onclick = function () {
    let object = prompt("Ne Yapılacak?");
    if (object) {
        CreateObject(object, false);
    }
}

function CreateObject(subject, checked) {
    let div = document.createElement("div");
    let creation = document.createElement("label");
    let CheckBox = document.createElement("input");
    let deleteButton = document.createElement("button");

    deleteButton.id = lastIndex.toString();
    CheckBox.type = "checkbox";
    CheckBox.checked = checked;
    lastIndex++;

    creation.textContent = subject;
    deleteButton.textContent = "X";
    deleteButton.className = "remove";

    div.appendChild(creation);
    div.appendChild(deleteButton);
    div.appendChild(CheckBox);
    div.appendChild(document.createElement("br"));
    document.body.appendChild(div);

    deleteButton.onclick = function () {
        div.remove();
        removeFromContents(subject);
        save();
    }

    CheckBox.onchange = function () {
        updateCheckboxStatus(subject, CheckBox.checked);
        save();
    }

    Contetns.push({ subject: subject, checked: checked });
    save();
}

function removeFromContents(subject) {
    const index = Contetns.findIndex(item => item.subject === subject);
    if (index !== -1) {
        Contetns.splice(index, 1);
    }
}

function updateCheckboxStatus(subject, checkedStatus) {
    const index = Contetns.findIndex(item => item.subject === subject);
    if (index !== -1) {
        Contetns[index].checked = checkedStatus;
    }
}
