import Tank from "./Tank.js";
import Input from "../Input.js";
import Polygon from "../Physics/Polygon.js";
import PVector from "../Physics/PVector.js";
import Status from "../Status.js";

// The enemy tank(s) the player fights against
export default class Enemy extends Tank {
    constructor(x, y, capacity) {
        super(x, y, capacity);
        super.addType("ENEMY");
        this.Input = new Input();
        this.path = null;
    }
    init() {
        super.init();
        this.hitbox.color = "#00FF00";
        return 0;
    }
    update() {
        var response = super.getResp();
        super.setPkt(Status.GRAB, "PLAYER");
        super.setPkt(Status.GRAB, "WALL");
        super.setPkt(Status.GRAB, "MAP");
        let move = new PVector(0,0);
        let rotation = 0;
        if (response[2]) {
            var player = response[0][0];
            var walls = response[1];
            var nodeMap = response[2][0].nodeMap;

            // Gun player tracking
            var gunVector = PVector.normalize(PVector.sub(player.pos, this.pos));
            if (gunVector.y) {      //Check for division by 0
                var gunRotation = Math.atan2(gunVector.y, gunVector.x);
                super.applyGunRot(gunRotation);
            }

            // Line of sight stopping and shooting
            var gunLOS = new Polygon(this.pos);
            gunLOS.addPoint(this.pos.x, this.pos.y);
            gunLOS.addPoint(player.pos.x, player.pos.y);
            var canSee = true;
            walls.forEach(wall => {
                if (Polygon.isColliding(gunLOS, wall.hitbox)) {canSee = false;}
            });
            if (canSee) {
                super.shoot();
            }
            else{       // Only move if not shooting
                // Add start node and connections
                if (!this.path) {
                    var startNode = new PVector(this.x, this.y);
                    var startConns = [];
                    var endNode = player.pos;
                    var endConns = [];
                    for (var i=0; i<nodeMap.length; i++) {
                        var currNode = nodeMap[i].pos;
                        var startRay = new Polygon(startNode);
                        startRay.addPoint(startNode.x, startNode.y);
                        startRay.addPoint(currNode.x, currNode.y);
                        var endRay = new Polygon(endNode);
                        endRay.addPoint(endNode.x, endNode.y);
                        endRay.addPoint(currNode.x, currNode.y);

                        var startObstructed = false;
                        var endObstructed = false;
                        for (var k=0; k<walls.length; k++) {
                            var currWall = walls[k];
                            if (Polygon.isColliding(startRay, currWall.hitbox)) {
                                startObstructed = true;
                            }
                            if (Polygon.isColliding(endRay, currWall.hitbox)) {
                                endObstructed = true;
                            }
                        }

                        if (!startObstructed) {
                            startConns.push(currNode);
                            nodeMap[i].conns.push(startNode);
                        }
                        if (!endObstructed) {
                            endConns.push(currNode);
                            nodeMap[i].conns.push(endNode);
                        }
                    }
                    var start = {
                        pos: startNode,
                        conns: startConns,
                    }
                    var end = {
                        pos: endNode,
                        conns: endConns,
                    }
                    nodeMap.push(start);
                    nodeMap.push(end);
                
                    // A* pathing
                    this.path = this.calculatePath(nodeMap, start, end);
                } 
                // console.log(this.path);
                var currNode = this.path[0];
                console.log(currNode);
                // Turn to face nodes
                let tmp = this.hitbox.rotation;
                var nodeVector = PVector.sub(currNode.pos, PVector.copy(this.pos));
                var angleBetween = PVector.getAngle(nodeVector) - tmp;
                var MAX_ROTATION = Math.PI / 60;
                if ((angleBetween <= Math.PI) && (angleBetween >= MAX_ROTATION)) {
                    rotation = -1 * MAX_ROTATION;
                } else if ((angleBetween <= Math.PI) && (angleBetween < MAX_ROTATION)) {
                    rotation = angleBetween;
                } else if ((angleBetween > Math.PI) && (angleBetween >= MAX_ROTATION)) {
                    rotation = MAX_ROTATION;
                } else if ((angleBetween > Math.PI) && (angleBetween < MAX_ROTATION)) {
                    rotation = angleBetween;
                }
                // console.log(currNode);
                // console.log(nodeVector);
                // console.log(angleBetween);

                // Movement between nodes
                var THRESHOLD = 2;
                if (angleBetween == 0) {
                    if (PVector.getScalar(nodeVector) > THRESHOLD) {
                        move.translate(PVector.getUnitVec(this.hitbox.rotation));
                        move.scale(3);
                    } else {
                        this.path.splice(0, 1);
                    }
                }
            }
        }
        super.editMovement(move);
        super.editRot(rotation);
        super.clearResp();
        return super.update();
    }
    calculatePath(nodeMap, start, end) {
        var queue = [];
        var came_from = [];
        var cost_so_far = [];

        queue.push({
            node: start,
            prio: 0,
        });
        came_from.push({
            node: start,
            from: null,
        });
        cost_so_far.push({
            node: start,
            cost: 0,
        });

        while (queue.length > 0) {
            var currNodeIndex = this.queueNext(queue);
            var currNode = queue[currNodeIndex];
            queue.splice(currNodeIndex, 1);

            if (currNode.node.pos === end.pos) {break;}

            for (var i=0; i<currNode.node.conns.length; i++) {
                var nextPos = currNode.node.conns[i];
                var new_cost = cost_so_far[this.find(cost_so_far, 'node', currNode.node)] + this.dist(currNode.node.pos, nextPos);
                var nextInd = this.find(cost_so_far, 'node', nextPos, 'pos');
                if ((nextInd == -1) || (cost_so_far[nextInd].cost > new_cost)) {
                    var nextNode = nodeMap[this.find(nodeMap, 'pos', nextPos)];
                    cost_so_far.push({
                        node: nextNode,
                        cost: new_cost,
                    });
                    var nextPrio = new_cost + this.dist(end.pos, nextPos);
                    queue.push({
                        node: nextNode,
                        prio: nextPrio,
                    });
                    came_from.push({
                        node: nextNode,
                        from: currNode,
                    });
                }
            }
        }
        var currTrace = end;
        var path = [];
        path.push(currTrace);
        while (this.find(came_from, 'node', currTrace.pos, 'pos') != -1) {
            currTrace = came_from[this.find(came_from, 'node', currTrace.pos, 'pos')].from;
            path.push(currTrace);
        }
        return path.reverse();
    }
    find(list, compare0, compareVal, compare1) {
        for (var i=0; i<list.length; i++) {
            if (compare1) {
                if (list[i][compare0][compare1] === compareVal) {
                    return i;
                }
            } else {
                if (list[i][compare0] === compareVal) {
                    return i;
                }
            }
        }
        return -1;
    }
    queueNext(queue) {
        var lowestIndex = 0;
        for (var i=0; i<queue.length; i++) {
            if (queue[i].prio < queue[lowestIndex].prio) {lowestIndex = i;}
        }
        return lowestIndex;
    }
    dist(pvec1, pvec2) {
        return Math.sqrt(Math.pow(Math.abs(pvec1.x - pvec2.x), 2) + Math.pow(Math.abs(pvec1.y - pvec2.y), 2));
    }
    render(ctx) {
        super.render(ctx);
    }
    exit() {}
}
