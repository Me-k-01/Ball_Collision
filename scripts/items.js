
class Plane {
    constructor(x, y, z, θ=0, φ=0) {
        this.pos  = new Vector(x, y, z); 
        this.drawSize = 500;
        this.n = new Vector();
        this.setNormalFromRotation(θ, φ); 
        this.θ = θ;
    }

    /*setNormal(n)  {
        n.normalize();
        let θ = Math.acos(n.z / Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z) );
        let φ = Math.sign(n.y) * Math.acos(n.x / Math.sqrt(n.x * n.x + n.y * n.y));
        if (φ<0) {
            φ += Math.PI*2
        } 
        this.rotate = new Vector(θ, 0, φ); 
        this.n = n; // Normal du plan
        

        console.log("n");
        console.log(n.clone());
        console.log("θ, φ", θ, φ);
        this.setNormalFromRotation(θ, φ);
        console.log(this.n.clone());
    }*/



    setNormalFromRotation(θ, φ=0) { 
        this.n.x = Math.sin(θ) * Math.cos(φ);
        this.n.z = Math.sin(θ) * Math.sin(φ);
        this.n.y = Math.cos(θ);
        //this.rotate = new Vector(θ, 0, φ);  // TODO
        this.θ = θ;
        this.n.normalize(); 
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y, this.pos.y); 
        //rotateX(this.rotate.x);
        //rotateY(this.rotate.y);
        //rotateZ(this.rotate.z);
        rotateX(Math.PI/2);
        rotateY(-this.θ);  
        plane(this.drawSize, this.drawSize);
        pop();

        // Normal 
        /*push(); 
        translate(this.n.x * 100, this.n.y*100, this.n.z*100);
        sphere(5);
        pop();*/
    }

    
    faceNormal( dir ) {
        //this.n = this.n.mult(-Math.sign(Math.dot( dir, this.n )));
        this.n = dir.dot(this.n ) < 0 ? this.n : this.n.mult(-1);
    }

} 
 

class Sphere { 
    constructor(x, y, z) {
        this.spawnPos = new Vector(x, y, z);
        this.reset(); 
        this.r = 70; // Radius de la sphere
        this.prevD = this.calcD(ground);
        this.prevDeltaTime = 0; 
    }

    

    reset() { // Set up les positions et velocité
        this.pos = this.spawnPos.clone();
        this.vel = new Vector(
            config.throwingStrength.x.value(),
            config.throwingStrength.y.value(),
            config.throwingStrength.z.value(),
        );
    }
 
    update(dT) {  
 
 
        // Acceleration
        // v(t+dT) = v(t) + a(t)*dT
        this.vel.y += config.gravity.value() * dT;
        this.vel.mult(config.damping.value());
        // Deplacement
        // P(t+dT) = P(t) + n(t)*dT
        this.pos.add(this.vel.clone().mult(dT)); 

        this.groundCollide(dT);   

        this.prevDeltaTime = dT;

  
        //  euler explicit -> pas ouf
        // Euler simplectique : un peu plus stable
    }

    calcD(plan) { // Retourne une pseudo-distance entre la balle et un plan (peut êtres negatif suivant la position par rapport a la normal)
        let d = this.pos.clone().sub(plan.pos).dot(plan.n); 
        d -= Math.sign(d) * this.r;  // prendre en compte le rayon de la balle 
        return d;
    }

    groundCollide(dT) {
        //ground.faceNormal(this.vel);
        let n = ground.n.clone(); 

        // (sphere.x-plan.p) dot plan.n -> distance de la projection selon la direction de la normal du plan
        /*
        let d = this.pos.clone().sub(ground.pos).dot(ground.n); //+ this.r;
        console.log(Math.sign(d));
        if (Math.abs(d) < this.r ) { // collision
            // correction de la position
            this.pos.add(n.clone().mult(Math.sign(d) * (this.r - Math.abs(d)))) ; 
            */

        
        let d = this.calcD(ground); 
        //console.log(f);
         
        if (Math.sign(d) !== Math.sign(this.prevD) ) { // collision
            // Correction
            let f = this.prevD/(this.prevD-d); // Moment de la collison entre les deux derniers updates
            //this.pos.add(n.clone().mult(Math.sign(this.prevD) * (this.r - Math.abs(d)))) ; 
            

            // Reponse de collision
            //1. Divide the velocity just before the collision v− into normal and tangential components via :
            let vn_ = n.clone().mult(this.vel.dot(n)); // vn- = (v- dot n) * n 
            let vt_ = this.vel.clone().sub(vn_);  // vt- = v- - vn-
            

            //2. Compute the elasticity response vn+ and the friction response vt+ via
            let vn = vn_.mult(-config.cr.value()); // vn+ = -cr * vn-
            let vt = vt_.mult(1-config.cf.value()); // vt+ = (1-cf)vt-
    
            //3. Change the velocity of the object to the new velocity .
            let newVel = vn.add(vt);
          
            // TODO : Condition de repos
                //  is ║v║ < ϵ1? If so, then
                // is d < ϵ2 for some plane? If so, then
                // is F dot n < ϵ3 ? If so, then
                // is ║Ft║ < μ║Fn║ 
            
            if (newVel.norm() < config.resting.value()) {  
                newVel.zeroes();
            }
 
            // Correction de la position
            this.pos.sub(this.vel.clone().mult((1-f) * dT)); // Retirer la dernière partie 
            this.pos.add(newVel.clone().mult((1-f) * dT)); // Corriger vers la nouvelle direction 

            this.vel = newVel;
        }  
        this.prevD = this.calcD(ground); 
    } 

    render() {  
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);  
        sphere(this.r);
        pop();
    }
}
