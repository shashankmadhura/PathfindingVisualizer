
export const depthFirstSearch=(grid,startnode,finishnode)=>{
    //assign the distance of startnode to zero
    let visitedNodes=[]
    //stack to keep track of unexplored nodes(we dont explore the node we go deep down)
    let stack=[] 
    stack.push(startnode)

    //repeat untill the stack is empty
    //or target node is found
    while(stack.length){
        //current node 
        let currentNode=stack.pop()       
        visitedNodes.push(currentNode)
        //visited true,we wont visit it again
        currentNode.isVisited=true
        //target found
        if(currentNode===finishnode) return visitedNodes;
        //update the stack with neighbour value     
        updateStack(grid,currentNode,stack)
    }
    
    //target not found
    return visitedNodes
}



//update stack
 const updateStack= (grid,currentNode,stack)=>{
     //get the neighbour ORDER(left,bottom,right,top) since we are poping it out
     //it will become(top,right,bottom,left)
    let neighbors= getCurrentNodeNeighbors(currentNode,grid)

    //push each neighbour to stack and update the distance ,prev node to back track
    for(let node of neighbors){
        stack.push(node)
        node.previousNode=currentNode
    }
}   



//neighbour nodes
const getCurrentNodeNeighbors=(currentNode,grid)=>{
    const neighbors = [];

    const {column, row} = currentNode;

    //left cell
    if (column > 0) neighbors.push(grid[row][column - 1]);

    //bottom cell
    if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);

    //right cell
    if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);

    //top cell
    if (row > 0) neighbors.push(grid[row - 1][column]);

    //filter out visited and wall nodes
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);

}
