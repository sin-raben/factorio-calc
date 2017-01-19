//jshint esversion: 6
//'use strict';
function selectFI(a) {
    var el = sel1.selectedOptions[0].innerHTML;
    try {
        var img = document.getElementById('imgFI');
        img.src = fi[el].host+fi[el].img;
        img.alt = el;
        var mapCraft = document.getElementById('mapCraft');
        mapCraft.innerHTML = "";
        var OutV = document.getElementById('inpV').value;
        mapCraft.appendChild(getBlock(el, OutV));
    } catch (err) {}
}
function str(strings, ...values) {
    let str = "";
    for (let i = 0; i < values.length; i++) {
        str += strings[i];
        str += values[i];
    }
    // последний кусок строки
    str += strings[strings.length - 1];
    return str;
}
function getBlock(material, out) {

    console.log('material', material, out);
    if (out===0) {
        return document.createElement('div');
    }
    try {
        //var rec = fcr[material][0];
        var rec = fcr[material][fcr[material].length - 1];
        var v = rec.Out / rec.Time;
        var countFabric = out / v;

        var fab = rec.Fabric;
        console.log('fab', fab);
        var inHTML = str `
        <div class="${fabricImg[fab].style} Fab" data-title="${JSON.stringify(rec).replace(/\"/g, '\'')}">
            <div class="countF">
                <span>${countFabric}</span>
            </div>
            <div class="outF">
                <span>${out}</span>
            </div>
            <div class="materialF">
                <img src="${fi[material].host+fi[material].img}" width="24" height="24" alt="">
            </div>
        </div>
        <div class="childrenF"></div>`;

        var nodeF = document.createElement('div');
        nodeF.classList.add('nodeF');
        nodeF.innerHTML = inHTML;
        var childrenF = nodeF.getElementsByClassName('childrenF')[0];

        for (var e in rec.Items) {
            childrenF.appendChild(getBlock(e, countFabric * rec.Items[e]));

        }
        return nodeF;
    } catch (err) {
        console.log('err', err);
        return document.createElement('div');
    }
}
/*function funR() {
    for (let pr1 in fcr) {
        for (let i = 0; i < fcr[pr1].length; i++) {
            fcr[pr1][i].Items = {};
            fcr[pr1][i]['Cырьё'].forEach((e) => {
                for (let prop in e) {
                    fcr[pr1][i].Items[prop] = e[prop];
                }
            });
        }
    }
}
function funD() {
    for (let pr1 in fcr) {
        for (let i = 0; i < fcr[pr1].length; i++) {
			delete fcr[pr1][i]['Cырьё'];
        }
    }
	console.log(JSON.stringify(fcr));
}*/
