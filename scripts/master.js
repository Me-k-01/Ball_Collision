let items = []; 
let cam; 
let ground;
let font; 

let config = {}; 
let menu;

function addSlider(key, slider, onChange = () => {}) {
    config[key] = slider;

    let label = createDiv(key + " : " + slider.value());
    menu.child(label); 
    menu.child(slider); 

    slider.elt.addEventListener("input", 
        (evt) => { 
            label.html(key + " : " + evt.target.value);
            onChange();
        }
    );
}


function addSliderOfVec(key, min, max, step=1, subSliderValues={x : 0, y : 0, z: 0}, onChange=()=>{}) {
    let label = createDiv(key);
    menu.child(label);

    let addSubSlider = (coord, val) => {
        let slider = createSlider(min, max, val, step);

        let container = createDiv();
        let label = createDiv(coord + " : " + Math.round(val*10000) / 10000);
        container.child(label); 
        container.child(slider);  
        container.class("subslider");
        menu.child(container);
     
        slider.elt.addEventListener("input", 
            (evt) => { 
                label.html(coord + " : " +  Math.round(evt.target.value*10000) / 10000);
                onChange();
            }
        );
        return slider;
    };
 
    config[key] = {}
    for (const k in subSliderValues) {
        config[key][k] = addSubSlider(k, subSliderValues[k]);
    };
}

//////////////////////////  
function preload() {
    font = loadFont('assets/Inconsolata-Regular.ttf');
}
 

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);  
    //textSize(15);
    //noStroke();

    textSize(15);
    background(20, 20, 20);
    textFont(font);
    textSize(35);
 
    menu = createDiv();
    menu.class("menu");

    // coef de reflection : 0.5 -> Baseball ball on wood, 0.75 -> tennisball on court, 0.85 -> Basketball on court
    addSlider("cr", createSlider(0, 1, 0.85, 0.01));
    // coef de friction : 0.05 -> teflon over teflon,  0.35 -> Wood on wood, 0.65 -> steel over steel 
    addSlider("cf", createSlider(0, 1, 0.35, 0.01));
    // Condition de repos
    addSlider("resting", createSlider(0, 200, 24, 1));
    // drag causé par la friction de l'air
    addSlider("damping", createSlider(0, 1, 0.96, 0.01));
    // Gravité
    addSlider("gravity", createSlider(0, 20, 4, 1));  

    addSliderOfVec("throwingStrength", 0, 500);

    ground = new Plane(0, 0, 0, Math.PI, 0);  
    /*addSliderOfVec("rotation plan", 0, Math.PI * 2, step=0.01, {
            //θ : Math.round(ground.rotate.x*100)/100, 
            //φ : Math.round(ground.rotate.z*100)/100
            θ : ground.rotate.x, 
            φ : ground.rotate.z
        }, 
        () => {
            console.log(config["rotation plan"]["θ"].value());
            ground.setNormalFromRotation(config["rotation plan"]["θ"].value(), config["rotation plan"]["φ"].value())
    });*/
    addSlider("tilt", createSlider(Math.PI/2, Math.PI*2 , ground.θ, 0.01), () => {
        ground.setNormalFromRotation(config["tilt"].value());
    })

      
    /*addSliderOfVec("normal du plan", 0, 1, step=0.01, 
        { x : 0, y : 1, z : 0 }, 
        () => ground.setNormal(new Vector(
            config["normal du plan"].x.value(), 
            config["normal du plan"].y.value(), 
            config["normal du plan"].z.value()
        ))
    );*/

    // suppress right-click context menu
    document.oncontextmenu = () => false; 

    
    items.push(new Sphere(0, -400, 0));
 
    cam = createEasyCam({center:[0,-100,100]});  
}

function draw() { 
    background(30, 30, 30);
    ground.render();
    
    for (const item of items) { 
        item.render(); 
        item.update(deltaTime / 100);
    }
    
    text('Press "Space"', -100, 200); 
}


document.addEventListener("keyup", (event) => {
    if (event.key == " ") {
        console.log("Reset des positions");
        for (const item of items) {
            item.reset();
        }
    } 
});