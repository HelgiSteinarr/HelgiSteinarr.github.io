window.onload = function(){
    /* Creates the wiki "page" under the game */
    let section = document.createElement("section");
    let n1h1 = document.createElement("h1");
    let n1h3 = document.createElement("h3");
    let n1p = document.createElement("p");
    let n2h3 = document.createElement("h3");
    let n2p = document.createElement("p");
    let n3h3 = document.createElement("h3");
    let n3p = document.createElement("p");
    let n4h3 = document.createElement("h3");
    let n4p = document.createElement("p");
    let n5h3 = document.createElement("h3");
    let n5p = document.createElement("p");

    let sch3 = document.createElement("h3");
    let vid = document.createElement("iframe");

    n1h1.innerText = "Wiki / Skýrsla";
    n1h3.innerText = "Höfundur";
    n1p.innerText = "Helgi Steinarr Júlíusson";
    n2h3.innerText = "Lýsing";
    n2p.innerText = "Einfaldur 2d platformer gerður í Phaser 3 með sprengjum sem skoppa um sem þarf að passa sig á, " +
    "oddum sem þarf að passa sig á að detta ekki í og svo eru stjörnur á ýmsum stöðum til að safna og fá hærri stig.";
    n3h3.innerText = "Stjórnun";
    n3p.innerText = "Upp ör (↑) til að hoppa, Hliðar örfar (← →) til að fara til hliðanna og svo niður ör (↓) til að fara hraðar niður ef þú ert hoppandi.";
    n4h3.innerText = "Heimildir";
    n4p.innerHTML = "Byrjaði á að gera eitt tutorial frá Phaser sjálfum til að læra grunnin á phaser (<a href='https://goo.gl/5yknbF' target='_blank'>Þetta hér</a>)" +
    " og í því er gerður lítill fixed camera leikur sem notar basicin í Phaser 3. Svo byggði ég utan á þennan einfalda leik, stækkaði mappið, gerði hann svo myndavélin elti " +
    "karakterinn sem leyfir mér að gera mikið meira með leikinn. Setti up mappið svo að lítið mál væri að gera svo hægt væri að hafa fleiri möpp í framtíðinni og margt fleira. " +
    "Getur séð að ég ákvað að nota sprengju og stjörnu texturin áfram í mínum leik.<br>'Pallarnir' og karakterinn eru búnir til af mér sjálfum í einhverjum online pixel editor, " +
    "bakgrunninn og oddana fann ég á netinu.";
    n5h3.innerText = "Næstu skref";
    n5p.innerHTML = "Mappið var þannig sett up svo einfaldlega væri hægt að gera svo fleiri möpp séu spilanleg svo það væri ofarlega á listanum. " +
    "Annað væri að gera menu og game over menu og svo mögulega power up pickups og svoleiðis.<br><br><br>";

    sch3.innerText = "Upptaka af spilun leiks";
    vid.src = "screencast.mp4";
    vid.width = 600;
    vid.height = 400;

    document.body.appendChild(section);
    section.appendChild(n1h1);
    section.appendChild(n1h3);
    section.appendChild(n1p);
    section.appendChild(n2h3);
    section.appendChild(n2p);

    section.appendChild(sch3);
    section.appendChild(vid);

    section.appendChild(n3h3);
    section.appendChild(n3p);
    section.appendChild(n4h3);
    section.appendChild(n4p);
    section.appendChild(n5h3);
    section.appendChild(n5p);
}
