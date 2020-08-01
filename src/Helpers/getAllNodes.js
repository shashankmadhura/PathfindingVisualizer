//all nodes 
export const getallNodes=(grid)=>{
    let nodes=[]
    for(let rows of grid){
        for (let node of rows){
            nodes.push(node)
        }
    }
    return nodes
}