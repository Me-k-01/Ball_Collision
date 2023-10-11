
class Vector {
    // Représente un point 3D dans l'espace
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
 

    add(x) {
        if (typeof x === 'object' && x !== null) {
            this.x += x.x;
            this.y += x.y;
            this.z += x.z;
            return this;
        }
        this.x += x;
        this.y += x; 
        this.z += x;
        return this;
    }

    sub(x) {
        if (typeof x === 'object' && x !== null) {
            this.x -= x.x;
            this.y -= x.y;
            this.z -= x.z;
            return this;
        }
        this.x -= x;
        this.y -= x; 
        this.z -= x;
        return this;
        
    }

    mult(x) {
        if (typeof x === 'object' && x !== null) {
            this.x *= x.x;
            this.y *= x.y;
            this.z *= x.z;
            return this;
        }
        this.x *= x;
        this.y *= x;
        this.z *= x;
        return this;
    }

    norm() {
        return sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }
    normalize() {
        let norm = this.norm();
        this.x = this.x / norm;
        this.y = this.y / norm;
        this.z = this.z / norm;
        return this;
    }

    dot(other) { 
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    clone() {
        return new Vector(this.x, this.y, this.z);
    }
}
