import {getallNodes} from '../Helpers/getAllNodes';
export const randomMaze=(grid)=>{
    let nodes=getallNodes(grid)
    let visitednode=[]
    let counter=0

    // nodes.length/3 indicates 30% walls
    while(counter!==Math.floor(nodes.length/3)){
        //pushing some random index of nodes
        //return arandom index
        let randomIndex = Math.floor(Math.random() * nodes.length);

        if(nodes[randomIndex].start) continue;
        if(nodes[randomIndex].end) continue;

        visitednode.push(nodes[randomIndex])
        counter+=1
    }
return visitednode

}