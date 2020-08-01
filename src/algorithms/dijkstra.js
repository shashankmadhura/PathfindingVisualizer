import {getallNodes} from '../Helpers/getAllNodes'

export const dijkstra=(grid,start_node,finish_node)=>{
     start_node.distance=0

    //grab all the unviited nodes
    let unvisitednodes=getallNodes(grid)
    //visited nodes
    let  visitedNodeInorder=[]


    //don't think about the target node assume all the distances to be infinity
    //we will visit all the nodes untill the target node is found
    //firstly update the neighbour nodes distances 
    //select the current node which has lower cost then repeat

    while(!!unvisitednodes.length){
        //sorting by distance
        sortBydistance(unvisitednodes)
        //poping from left side
        let currentNode=unvisitednodes.shift()

        //if curr. Node is wall continue
        if(currentNode.isWall) {
            continue;
        }

        //when surrounded by walls
        if(currentNode.distance===Infinity) return visitedNodeInorder;

        //finish node found
        if(currentNode===finish_node) return visitedNodeInorder;

        //we dont want to visit a visited node again so make it true
        currentNode.isVisited=true

        //push visited node
        visitedNodeInorder.push(currentNode)

        //updateNeighbourDistances
        updateCurrentNodeNeighbors(currentNode,grid)


    }

}

//sort by distance
const sortBydistance=(unvisitednodes)=>{
    unvisitednodes.sort((nodeA,nodeB)=>nodeA.distance-nodeB.distance)
}

//update the neighbour distances(cost)
const updateCurrentNodeNeighbors=(currentNode,grid)=>{
    //get the neighbour nodes
    const neighbors=getCurrentNodeNeighbors(currentNode,grid)

    //iterate through each node 
    for(let node of neighbors){
        node.distance=currentNode.distance+1
        //keep track of prev node(parent node) to backtrack
        node.previousNode=currentNode
    }

}

//get all the neighbour
const getCurrentNodeNeighbors=(currentNode,grid)=>{
    const neighbors = [];

    const {column, row} = currentNode;

    //top neighbour cell
    if (row > 0) neighbors.push(grid[row - 1][column]);

    //bottom neighbour cell
    if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);


    //left neighbour cell
    if (column > 0) neighbors.push(grid[row][column - 1]);

    //right neighbour cell
    if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);

    //filter out he visited
    return neighbors.filter(neighbor => !neighbor.isVisited);

}


