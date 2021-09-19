// odwołanie do elementu canvas
const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

// odwołanie do elementu canvas z układem współrzędnych
const canvas_coordinate_system = document.getElementById("canvas-coordinate-system");
const ctx2 = canvas_coordinate_system.getContext('2d');

// pobranie i zapisanie wielkości elementu canvas
const cs_width = canvas.width;
const cs_height = canvas.height;

const figures_list = [];

const one_parts = 60;
let scale = 1;
let coordinate_system = true;

// uchwyt do checkboxa coordinate-system
const checkbox_coordinate_system = document.getElementById("checkbox-coordinate-system");
checkbox_coordinate_system.addEventListener('click', isCooordinateSystem);

// uchwyt do ikony z koszem
const trash = document.querySelector(".clear-canvas");
trash.addEventListener('click', function() {
    scale = 1;
    figures_list.length = 0;
    drawEmptyCanvas(ctx);
    drawEmptyCanvas(ctx2);
    drawCoordinateSystem();
})

// zmiana koloru
const canvasColor = document.getElementById('kolor');

// uchwyt do przycisku rusującego czworokąt
const rectangle_input_draw = document.getElementById("rectangle-input-draw");
rectangle_input_draw.addEventListener('click', drawRectangle);

// uchwyt do przycisku rusującego trójkąt
const triangle_input_draw = document.getElementById("triangle-input-draw");
triangle_input_draw.addEventListener('click', drawTriangle);

// uchwyt do przycisku rusującego okrąg
const circle_input_draw = document.getElementById("circle-input-draw");
circle_input_draw.addEventListener('click', drawCircle);

/* ===================
    Definicje funkcji
*/
function drawEmptyCanvas(canvas_elem) {
    canvas_elem.clearRect(0, 0, cs_width, cs_height);
}

function rectanglePrint(tab, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cs_width / 2 + tab[0].x*one_parts/scale, cs_height / 2 -tab[0].y*one_parts/scale);
    ctx.lineTo(cs_width / 2 + tab[1].x*one_parts/scale, cs_height / 2 -tab[1].y*one_parts/scale);
    ctx.lineTo(cs_width / 2 + tab[2].x*one_parts/scale, cs_height / 2 -tab[2].y*one_parts/scale);
    ctx.lineTo(cs_width / 2 + tab[3].x*one_parts/scale, cs_height / 2 -tab[3].y*one_parts/scale);
    ctx.fill();
    console.log(tab);
}

function trianglePrint(x1, x2, x3, y1, y2, y3, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cs_width / 2 + x1*one_parts/scale, cs_height / 2 -y1*one_parts/scale);
    ctx.lineTo(cs_width / 2 + x2*one_parts/scale, cs_height / 2 -y2*one_parts/scale);
    ctx.lineTo(cs_width / 2 + x3*one_parts/scale, cs_height / 2 -y3*one_parts/scale);
    ctx.fill();
}

function circlePrint(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc((cs_width / 2 + x*one_parts/scale), (cs_height / 2 -y*one_parts/scale), (one_parts/scale)*radius, 0, 2 * Math.PI, false);
    ctx.fill();
}

function point(x,y) {
    this.x=x;
    this.y=y;
    this.d=Math.abs(this.x)+Math.abs(this.y);
    if (this.x>=0 && this.y>=0){
        this.alfa=this.y/this.d;
    }
    if (this.x<0 && this.y>=0){
        this.alfa=2-this.y/this.d;
    }
    if (this.x<0 && this.y<0){
        this.alfa=2+Math.abs(this.y)/this.d;
    }
    if (this.x>=0 && this.y<0){
        this.alfa=4-Math.abs(this.y)/this.d;
    }
}

function comparePoint(a,b){
    return a.alfa-b.alfa;
}

function comparePoint2(a,b){
    return a.y-b.y;
}

function sideLenght(x1, y1, x2, y2){
    let dX = x2-x1;
    let dY = y2-y1;
    let d = Math.sqrt(dX*dX+dY*dY);
    return d;
}

function det(p1,p2,p3){
   let a= p1.x*p2.y + p2.x*p3.y + p3.x*p1.y - p3.x*p2.y - p1.x*p3.y - p2.x*p1.y;
   return a;
}

function drawRectangle() {
    let x1 = document.getElementById('aX-rectangle').value;
    let y1 = document.getElementById('aY-rectangle').value;
    let x2 = document.getElementById('bX-rectangle').value;
    let y2 = document.getElementById('bY-rectangle').value;
    let x3 = document.getElementById('cX-rectangle').value;
    let y3 = document.getElementById('cY-rectangle').value;
    let x4 = document.getElementById('dX-rectangle').value;
    let y4 = document.getElementById('dY-rectangle').value;
    
    pA= new point(x1,y1);
    pB= new point(x2,y2);
    pC= new point(x3,y3);
    pD= new point(x4,y4);
    let tab=[pA,pB,pC,pD];
    tab.sort(comparePoint2);
    let temp=tab.shift();
    tab.sort(comparePoint);
    tab.unshift(temp);       
    
    let do_yes=false;
    //sprawdzenie czy punkty są współliniowe
    function collinearity (pA,pB,pC) {
        if ((pB.x-pA.x)*(pC.y-pA.y)===(pB.y-pA.y)*(pC.x-pA.x)) {
            do_yes=true;
        }
        return do_yes;
    } 

    let Dfield1 = Math.abs((tab[1].x-tab[0].x)*(tab[2].y-tab[0].y) - (tab[1].y-tab[0].y)*(tab[2].x-tab[0].x))/2;
    let Dfield2 = Math.abs((tab[3].x-tab[0].x)*(tab[2].y-tab[0].y) - (tab[3].y-tab[0].y)*(tab[2].x-tab[0].x))/2;
    Dfield = Dfield1 + Dfield2;
    Dfield = Dfield.toFixed(2);

    let a = sideLenght(tab[0].x, tab[0].y, tab[1].x, tab[1].y);
    let b = sideLenght(tab[1].x, tab[1].y, tab[2].x, tab[2].y);
    let c = sideLenght(tab[2].x, tab[2].y, tab[3].x, tab[3].y);
    let d = sideLenght(tab[3].x, tab[3].y, tab[0].x, tab[0].y);
    Dcircuitt=a+b+c+d;
    Dcircuitt=Dcircuitt.toFixed(2);

    collinearity (pA,pB,pC);
    collinearity (pA,pB,pD);
    collinearity (pA,pC,pD);
    collinearity (pB,pC,pD);

    // skalowanie jeżeli jest konieczne (szukanie max x, y)
    let max_x = Math.abs(tab[0].x);
    let max_y = Math.abs(tab[0].y);

    for (let i=1; i<4; i++) {
        max_x = Math.max(Math.abs(tab[i].x), max_x);
        max_y = Math.max(Math.abs(tab[i].y), max_y);
    }

    if (max_x * one_parts/scale > cs_width / 2)
        rescaling(max_x, max_y);
    else if (max_y * one_parts/scale > cs_height / 2)
        rescaling(max_x, max_y);

    // rysowanie czworokąta
    if (do_yes == false) {
        rectanglePrint(tab, canvasColor.value);
        rectangleField();
    }
    else
        alert("Nie powstanie czworotkąt!");
    
    // dodanie figury do listy
    let rectangle = {
        type: "rectangle",
        vertices: tab,
        color: canvasColor.value
    };
    figures_list.push(rectangle);
}

function licz_kat(a,b,c) {
    let cos_kat = (b * b + c * c - a * a ) /( 2 * b * c ); 
    let kat = (Math.acos( cos_kat ) * 180 / Math.PI);
    kat = kat.toFixed(2);

    return kat;
  }

function drawTriangle() {
    let x1 = document.getElementById('aX-triangle').value;
    let y1 = document.getElementById('aY-triangle').value;
    let x2 = document.getElementById('bX-triangle').value;
    let y2 = document.getElementById('bY-triangle').value;
    let x3 = document.getElementById('cX-triangle').value;
    let y3 = document.getElementById('cY-triangle').value;
    Tfield = Math.abs((x2-x1)*(y3-y1)-(y2-y1)*(x3-x1))/2;
    
    let a = sideLenght(x1, y1, x2, y2);
    let b = sideLenght(x1, y1, x3, y3);
    let c = sideLenght(x3, y3, x2, y2);
    let Tcircuit = a+b+c;
    Tcircuitt = Tcircuit.toFixed(2);

    // Ustalanie typu trójkąta
    let kat1 = parseFloat(licz_kat(a,b,c));
    let kat2 = parseFloat(licz_kat(b,a,c));
    let kat3 = parseFloat(licz_kat(c,b,a));
    maxkat = kat1;
    if (maxkat < kat2) maxkat = kat2;
    if (maxkat < kat3) maxkat = kat3;
    
    if (maxkat > 90) {
        maxkat = 'Rozwartokątny'
    }
    else if (maxkat < 90) {
        maxkat = 'Ostrokątny'
    }
    else {
        maxkat = 'Prostokątny'
    }

    if ((a==b) && (b==c))
        {
            Ttype= 'Równoboczny' ;
        }
        else if ((a==b && a!=c) || (a==c && a!=b ) || (b==c && b!=a))
        {
            Ttype= 'Równoramienny';
        }
        else { 
            Ttype = 'Różnoboczny';
        }

    
    if ((a+b>c) && (a+c>b) && (c+b>a) && (Tfield>0)) {
        // skalowanie jeżeli jest konieczne (szukanie max x, y)
        const x_array = [x1, x2, x3];
        const y_array = [y1, y2, y3];
        let max_x = Math.abs(x1);
        let max_y = Math.abs(y1);

        for (let i=1; i<3; i++) {
            max_x = Math.max(Math.abs(x_array[i]), max_x);
            max_y = Math.max(Math.abs(y_array[i]), max_y);
        }
        
        if (max_x * one_parts/scale > cs_width / 2)
            rescaling(max_x, max_y);
        else if (max_y * one_parts/scale > cs_height / 2)
            rescaling(max_x, max_y);

        // rysowanie trójkąta
        trianglePrint(x1,x2,x3,y1,y2,y3, canvasColor.value);
        triangleField();

        // dodanie figury do listy
        let triangle = {
            type: "triangle",
            x1: x1,
            x2: x2,
            x3: x3,
            y1: y1,
            y2: y2,
            y3: y3,
            color: canvasColor.value
        }
        figures_list.push(triangle);
    }
    else 
        swal.fire("Nie powstanie trojkat, spróbuj jeszcze raz.");
    }

function drawCircle() {
    let radius = parseFloat(document.getElementById('r-circle').value);
    let x = parseFloat(document.getElementById('aX-circle').value);
    let y = parseFloat(document.getElementById('aY-circle').value);
    x = !isNaN(x) ? x : 0;
    y = !isNaN(y) ? y : 0;
    
    if (radius > 0) {
        // obliczanie pola i obwodu
        let Cfield = Math.PI * radius * radius;
        Cfieldd = Cfield.toFixed(2);
        let Ccircuit = 2 * Math.PI * radius;
        Ccircuitt = Ccircuit.toFixed(2);
        
        // skalowanie jeżeli jest konieczne
        const abs_x = Math.abs(x);
        const abs_y = Math.abs(y);

        if ((abs_x + radius) * one_parts/scale > cs_width / 2)
            rescaling(abs_x + radius, abs_y + radius);
        else if ((abs_y + radius) * one_parts/scale > cs_height / 2)
            rescaling(abs_x + radius, abs_y + radius);
        
        // rysowanie okręgu
        circlePrint(x, y, radius, canvasColor.value);
        circleField();

        // dodanie figury do listy
        let circle = {
            type: "circle",
            x: x,
            y: y,
            radius: radius,
            color: canvasColor.value 
        };
        figures_list.push(circle);
    }
}

function circleField()
{
    swal.fire({
        title:"Nowy okrąg:",
        html:"Pole =" + " " + Cfieldd + "<br>Obwód = " + Ccircuitt
    })
}

function rectangleField()
{
    swal.fire({
        title:"Nowy czworokąt:",
        html:"Pole = " + " " + Dfield + "<br>Obwód = " + Dcircuitt
    })
}

function triangleField()
{

    swal.fire({
        title:"Nowy trójkąt:",
        html:"Pole = " + Tfield + "<br>Obwód = " + Tcircuitt + "<br>Typ trójkąta: " + Ttype + ", " + maxkat
    })
}

function rescaling(x, y) {
    const scale_x = Math.ceil(x / 8);
    const scale_y = Math.ceil(y / 6);
    scale = (scale_x >= scale_y) ? scale_x : scale_y;
    
    // przerysowanie wszystkich figur z nową skalą
    drawEmptyCanvas(ctx);
    figures_list.forEach(item => {
        if (item.type === 'circle')
            circlePrint(item.x, item.y, item.radius, item.color);
        else if (item.type === 'triangle')
            trianglePrint(item.x1, item.x2, item.x3, item.y1, item.y2, item.y3, item.color);
        else if (item.type === 'rectangle')
            rectanglePrint(item.vertices, item.color);
    });
    console.log(figures_list);

    // przerysowanie układu wspołrzędnych z nową skalą
    drawEmptyCanvas(ctx2);
    drawCoordinateSystem();
}

function isCooordinateSystem() {
    coordinate_system = !coordinate_system;
    if (coordinate_system)
        drawCoordinateSystem();
    else
        drawEmptyCanvas(ctx2);
}

function drawCoordinateSystem() {
    ctx2.fillStyle = 'black';
    ctx2.lineWidth = 1 / 8;

    // rysowanie siatki pionowej
    for (let i=1; i < cs_width / one_parts; i++) {
        ctx2.beginPath();
        ctx2.moveTo(one_parts * i, 0);
        ctx2.lineTo(one_parts * i, cs_height);
        ctx2.closePath();
        ctx2.stroke();
    }
    // rysowanie siatki poziomej
    for (let i=1; i < cs_height / one_parts; i++) {
        ctx2.beginPath();
        ctx2.moveTo(0, one_parts * i);
        ctx2.lineTo(cs_width, one_parts * i);
        ctx2.closePath();
        ctx2.stroke();
    }

    ctx2.lineWidth = 3;
    
    // oś Y
    const position_oY = (cs_width - ctx.lineWidth) / 2;

    ctx2.beginPath();
    ctx2.moveTo(position_oY, cs_height);
    ctx2.lineTo(position_oY, 0);
    // strzałka
    ctx2.lineTo(position_oY - 6, 15);
    ctx2.moveTo(position_oY, 0);
    ctx2.lineTo(position_oY + 6, 15);
    ctx2.stroke();

    // oś X
    const position_oX = (cs_height - ctx.lineWidth) / 2;
    
    ctx2.beginPath();
    ctx2.moveTo(0, position_oX);
    ctx2.lineTo(cs_width, position_oX);
    // strzałka
    ctx2.lineTo(cs_width - 15, position_oX - 6);
    ctx2.moveTo(cs_width, position_oX);
    ctx2.lineTo(cs_width - 15, position_oX + 6);
    ctx2.stroke();

    // podpisanie osi X, Y
    ctx2.font = '15px Montserrat';
    ctx2.fillText('X', cs_width - 15, position_oX - 15);
    ctx2.fillText('Y', position_oY + 12, 15);

    // podpisanie jednostek układu współrzędnych
    ctx2.font = '12px Montserrat';
    const amount_horizontal_one_parts = cs_width / one_parts;
    const amount_vertical_one_parts = cs_height / one_parts;

    for (let i = 0; i < amount_horizontal_one_parts; i++) {
        ctx2.fillText((i - amount_horizontal_one_parts / 2) * scale, i * one_parts, position_oX - 2);
    }
    for (let i = 0; i < amount_vertical_one_parts; i++) {
        if (i == 6) continue;
        ctx2.fillText((i - amount_vertical_one_parts / 2) * scale, position_oY + 2, cs_height - (i * one_parts) - 1);
    }
}


// main function
function createFrame() {
    drawCoordinateSystem();
}

createFrame();