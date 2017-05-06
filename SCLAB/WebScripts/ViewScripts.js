function changeToolStyle(numb) {
    var toolList = document.getElementsByClassName('btnTool');
    for (var i = 0; i < toolList.length; i++) {
        toolList[i].classList.remove('btnToolActive');
    }
    toolList[numb].classList.add('btnToolActive');
}

function showElementItemDescription(event, flag) {
    var elItemDes = document.getElementById("elementItemDescription");
    if (flag) {
        var margTop = event.target.getBoundingClientRect().top - 200;
        var margLeft = event.target.getBoundingClientRect().left-450;
        elItemDes.style.marginTop = margTop + "px";
        elItemDes.style.marginLeft = margLeft + "px";
        elItemDes.style.display = "block";
    } else {
        elItemDes.style.display = "none";
    }


}

function activeButton() {
    var dis = document.getElementsByClassName("disabled");
    var mass=[];
    for (var i = 0; i < dis.length; i++) {
        mass.push(dis[i]);
    }
    for (var i = 0; i < mass.length; i++) {
        mass[i].classList.remove("disabled");
    }
}
var prItem;
function pressedItem(event) {
    prItem = event.target;
    if (!prItem.classList.contains('elementItem')) {
        prItem = prItem.parentElement;
    }
    var elemList = document.getElementsByClassName("elementItem");
    for (var i = 0; i < elemList.length; i++) {
        elemList[i].classList.remove("pressedItem");
    }
    prItem.classList.add("pressedItem");

}
