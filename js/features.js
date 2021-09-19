// uchwyt do przestrzeni roboczej
const work_space = document.getElementById('work-space');

work_space.addEventListener('mouseover', function() {
    changeOpacity(trash, 0.9);
});
work_space.addEventListener('mouseout', function() {
    changeOpacity(trash, 0.15);
});

// uchwyt do 3 formularzy, będziemy je wyświetlać i chować
const rectangle_form = document.getElementById('rectangle-form');
const triangle_form = document.getElementById('triangle-form');
const circle_form = document.getElementById('circle-form');

// uchwyt do ikony z kwadratem
const rectangle_icon = document.getElementById('rectangle-icon');
rectangle_icon.addEventListener('click', displayRectangleForm);

// uchwyt do ikony z trójkątem
const triangle_icon = document.getElementById('triangle-icon');
triangle_icon.addEventListener('click', displayTriangleForm);

// uchwyt do ikony z kołem
const circle_icon = document.getElementById('circle-icon');
circle_icon.addEventListener('click', displayCircleForm);

function changeOpacity(element, value) {
    element.style.opacity = value;
}

function displayRectangleForm() {
    triangle_form.style.display = 'none';
    circle_form.style.display = 'none';
    rectangle_form.style.display = 'block';
}

function displayTriangleForm() {
    rectangle_form.style.display = 'none';
    circle_form.style.display = 'none';
    triangle_form.style.display = 'block';
}

function displayCircleForm() {
    rectangle_form.style.display = 'none';
    triangle_form.style.display = 'none';
    circle_form.style.display = 'block';
}