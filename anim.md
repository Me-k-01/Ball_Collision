




animation 25hz -> 40 ms pour generer une img


on travail en double buffer



->  trouver un algo qui va faire evoluer ses parametre (algo génératif)

-> anim procedural



-> physic
l'eq decrit la relation cause consequence (avec les param on obtient la sol)


control de l'animation


## interpol lin
nurbs non regular splines



la forme de la traj
la vitesse le long de la traj

### morphing


### inverse kinematic

### MO cap


---
# Physically based  modeling

ODE : equation differentiel ordinaire

dérivé pente de la tengeante
c'est la traj de toute les fleches (du champs de vecteur)


# TODO : 
faire un rapport
faire simu
faire tourner (avec un vidéo)



// prendre en compte la restitution lors d'une collision

e = 0 choc inelastique
e=1 choc elastique (toute l'energie est transmise)

















--- Animation basé IA
# Comportement de groupe
emerge suivant les comportements individuel

une entité controle l'animation global : tete de groupe 

## Système multi-agent
l'agent a des capteurs pour apprehender son voisinage.
vois l'environnement et les autres agents autour de lui.
Il peut en déduire sont comportement.

3 étapes : perception, decision, action

le comportement des individus font émerger un comportement de groupe


(Mouvement de full -> multi-agent, ou approche physique (particule))

somme force = m * a
= m * dv/dt
= m * d²x/dt²

x(t) = 1/2 * t² + v0 * t + x0




# Physically based anim

random suivant une cloche de gaus (on echantillone plusieurs fois et on recupère les moyennes -> tant vers une cloche de gaus)



### Comportement rigide
le fait d'avoir un volume change le comportement du déplacement de l'obj (avec une forme il peut tourné autour de luis meme)
on associe un translation et une rotation (pour les particule on s'en fou)

### Obj deformable
continue -> discret
l'objets peut ainsi etre constitué de point / particule
fluid (poussé d'archimede)

poser les eq, les resoudre


approche eulerienne : faire des calculs en des points précis de l'espace
-> bien pour les fluides

modele lagrangien : mouvement de l'objet definis par les particules 


# quaternion : 
4 degres de liberté

la norme doit etre egal a 1 pour représenter une rotation (pour eviter la mise à l'echelle de l'objet)
|e^io| = 1

(similitude)

contrainte, quaternion unitaire

# Angle d'euler
pour représenter l'obj, on peut utiliser 3 rotation


pour une rotation une matrice 3x3 suffit
Une matrice est de rotation ssi inverse(m) = transposé(m)
(orthonormé)

(en tout 6 equations qui decrive)  

particule : 3 deg de liberté
corps rigide : 6 deg de liberté car 3 degres de rotation et 3 degres de translation



frotement visceux de l'air : 
plus une particule va vite, plus une force s'oppose a cette vitesse
il a une vitesse limite attegnable dans un milieu

## ODE 
equation differentiel ordinaire

integration pas solvable simplement :
equation numérique qui ne sera pas fiable (approximation)

stabilité:
contexte ou au lieu de trouver un bonne réponse, on a un systeme qui diverge completement par rapport a la solution réel

par exemple a cause d'ajout d'energie


methode d'integration d'euler -> Completement stable
pas d'ajout d'energie en trop, mais il peut y avoir une trop grosse perte d'energie


(petite masse ou grande force sont les premiers causes d'instabilité)


meilleur compromis en stabilité : runge kutta 4


l'integration nous donne un systeme non-lineaire quand on developpe
en general on approxime avec un systeme lineaire


## Interaction
collision et rebond, objet lié,

contrainte unilatéral : contrainte d'un seul coté (collision)

Prendre les contrainte en compte : 
corriger la position et la vitesse pour obeir a la contrainte
- projection : correction avec discontinuité de vitesse et de position
- penalité : injection de forces dans l'equation

## Control
force arbitraire ajouter dans la simulation afin de controler l'animation


## squelette

squelette -> il manque le degres de liberté pour la rotation de l'os
de plus les os deforme les muscles


### surface implicite

definis par une equation dans tout l'espace.
(const -> surface de niveau, lorsque la constante change, le niv change)

Monotone : permet de savoir si on est dedans l'objet, sur l'objet, ou en dehors de l'obj.

### Blob
surface implicite particulière.
Distance entre le point entre l'ensemble de point, qui donne une val scalaire.
On se retrouve avec une fonction f de scalaire, qui reagit suivant la distance des deux objets géomtrique (point, segment...)

cela creer des zone d'influence autour d'un point.




on se concentre que sur quelque degres de liberté (grace a une interpolation pour les autres points)

