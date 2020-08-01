export const breadthFirstSearch=(grid,start_node,finish_node)=>{
    //assign distance to the start node 
    //we will keep track of all the branches in queue FIFO
    start_node.distance=0
    let visitedNodes=[]
    let queue=[]
    queue.push(start_node) 

    //continue untill queue is empty or target node found  
    while(queue.length){
        let currentNode=queue.shift()
        visitedNodes.push(currentNode)
        currentNode.isVisited=true
        //final node
        if(currentNode===finish_node) {
            return visitedNodes;
        }

        //update queue with neighbouring Node
        updateQueue(grid,currentNode,queue)
    }
return visitedNodes

}

//update the queue 
 const updateQueue= (grid,currentNode,queue)=>{
     //get the neighbours
    let neighbors= getCurrentNodeNeighbors(currentNode,grid)
    //push each neighbour to the queue
    for(let node of neighbors){
        queue.push(node)
        node.isVisited=true
        node.distance=currentNode.distance+1
        node.previousNode=currentNode
    }
}   

//get neighboour
const getCurrentNodeNeighbors=(currentNode,grid)=>{
    const neighbors = [];

    const {column, row} = currentNode;

    if (row > 0) neighbors.push(grid[row - 1][column]);

    if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);

    if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);

    if (column > 0) neighbors.push(grid[row][column - 1]);

   
    //filter out visited and wall
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);

}
