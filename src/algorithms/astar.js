export const astar=(grid,startNode,finishNode)=>{
    //openlist where we push all the neighbours(about to explore)
    let openlist=[]
    //closed list where we push the visited nodes(already explored)
    let closedlist=[]

    //firstly we push startNode and to the open 
    startNode.distance=0
    startNode.f=0
    openlist.push(startNode)


     while(openlist.length){
         //we sort the openlist by F value
        sortOpenlistByFvalue(openlist)

        //current node is the node with least f value
        //we explored it ,so we push it to closed list  
        let currentNode=openlist.shift()
        closedlist.push(currentNode)

        //if we found the target node
        if(currentNode===finishNode){
            closedlist.push(currentNode)
            return closedlist
        }

        //updatecurrent node distance(g),herustic(h) and F (h+g)
        updateCurrentNodeNeighbors(currentNode,grid,finishNode,openlist,closedlist)
        
     }
     //after all nodes explored
     return closedlist
}




//sort the node based on f value 
const sortOpenlistByFvalue=(openlist)=>{
    openlist.sort((nodeA,nodeB)=> nodeA.f-nodeB.f)

}


//update neighbours of current node
const updateCurrentNodeNeighbors=(currentNode,grid,finishNode,openlist,closedlist)=>{
   
    let neighbors= getCurrentNodeNeighbors(currentNode,grid)

//traversing through the neighbours
    for(let node of neighbors){
        
        //if it is in openlist or it is a value we ignore
        if(closedlist.includes(node) || node.isWall) continue;

        //distance from start node to current Node
        let tentativedistance=currentNode.distance+1

        //if it is not in openlist it indicates that we have to update the node so we continue or
        //if the current distance is less than (if it is in already in open list) previous distance ,update the node
        if(!openlist.includes(node) || tentativedistance<node.distance){

            node.distance=tentativedistance
            
            //update the h and f of the node
            updateWithHeuristicAndF(node,finishNode)

            //parent node to backtrack
            node.previousNode=currentNode

            //if it is not in open list push it to the open list
            if(!openlist.includes(node)){
             openlist.push(node)
            } 

            //if it is in open list update with latest f and g value ,which will be lesser than prev
            // else{      
            //     upadateNodeInList(openlist,node)
               
            // }
            
        }
       
    }
}




//updating the node with greater f value in the open list with new updated f value(only for repeating neighbours)
// const upadateNodeInList=(openlist,node)=>{
//     for(let i=0;i<openlist.length;i++){
//         if(node.row===openlist[i].row && node.column===openlist[i].column){
//             openlist[i]=node
//             sortOpenlistByFvalue(openlist)
//             break
//         }

//     }
// }



//update the node with h ,f and g
const updateWithHeuristicAndF=(node,finishNode)=>{
    //using Manhattan distance to guess H  it is |x1 - x2| + |y1 - y2| (distance b/w current node and finish node)
    //you can also use Euclidean distance  sqrt((x1-x2)^2 +(y1-y2)^2)
    //node.h=Math.sqrt(((node.row-finishNode.row)**2)+( (node.column-finishNode.column)**2))(try this)
    node.h=Math.abs(node.row-finishNode.row)+Math.abs(node.column-finishNode.column)

    //f=distance(g)+h
    node.f=node.distance+node.h
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

    return neighbors


}



