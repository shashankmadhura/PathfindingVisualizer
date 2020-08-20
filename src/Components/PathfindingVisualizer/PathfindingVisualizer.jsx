import React, { Component } from 'react'
import Node from './Node/Node'
import './PathfindingVisualizer.css';
import {dijkstra}  from '../../algorithms/dijkstra';
import {depthFirstSearch}  from '../../algorithms/depthFirstSearch'
import {breadthFirstSearch}  from '../../algorithms/breadthFirstSearch'
import {astar}  from '../../algorithms/astar'
import {getNodesInShortestPathOrder} from '../../Helpers/backTrack'
import {getallNodes} from '../../Helpers/getAllNodes'
import {recursiveDivisionMaze} from '../../mazegeneraionAlgo/recurssiveDivision'
import {recurssiveVerticalSkew} from '../../mazegeneraionAlgo/recurDivVerticalSkew'
import {recurssiveHorizontalSkew} from '../../mazegeneraionAlgo/recurDivHorizontal'
import {randomMaze} from '../../mazegeneraionAlgo/randomMaze'
import NavBar from './NavBar/NavBar'
import {Tutorial} from './TutorialPopup/Tutorial'
import {primsalgo} from '../../mazegeneraionAlgo/PrimsAlgo';
import { wait } from '@testing-library/react';



//------------------------------------------------------------global variables-------------------------------------------------------
//Initialize grid size(even numbers)(dont forget to change maze algorithm PS:in case you change)
const ROW=24
const COL=62
//change onload start and end positions here
let START_NODE_ROW = 10;
let START_NODE_COL = 12;
let FINISH_NODE_ROW = 10;
let  FINISH_NODE_COL = 48;

//change animation speed here
const ANIMATION_SPEED=15;
const FINAL_PATH_ANIM_SPEED=20;

//variables to handle some of the mouse events
let MOUSE_PRESSED=false
let START=false
let END=false


//animation running finshed or not
//current algorithm to instantanty find the path
let FINISH=false
let RUNNING=false
let CURRENT_ALGO=""


export class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             grid:[],
             is_running:false,
             load:true

        }
    }



    //-------------------------------------------------------------INITIALIZE GRID-----------------------------------------------------
    async componentWillMount(){
        const grid =initializeGrid()
        await this.setState({grid})

        //start node and end node
        document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).classList.add('node-start')
        document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).classList.add('node-end')
        //bug fix outside the grid mouseup was not triggering
        window.addEventListener('mouseup',()=>{
            MOUSE_PRESSED=false
            START=false
        })

    }


    //-------------------------------------------------------------CLEAR GRID----------------------------------------------------------------
    clearGrid=()=>{
        const grid =initializeGrid()
        this.setState({grid})
        FINISH=false
        CURRENT_ALGO=""
        let nodes=getallNodes(grid)
            for(let i=0;i<nodes.length;i++){
            document.getElementById(`node-${nodes[i].row}-${nodes[i].column}`).classList.remove('node-visited')
            document.getElementById(`node-${nodes[i].row}-${nodes[i].column}`).classList.remove('shortest-path')
            document.getElementById(`node-${nodes[i].row}-${nodes[i].column}`).classList.remove('node-wall')
            }
    }

//--------------------------------------------------------------DIJKSTRA-----------------------------------------------------------------

    //visualize
        visualizeDijikstra=()=>{
        const {grid}=this.state
        this.clearPath()
        RUNNING=true
        CURRENT_ALGO="DIJKSTRA"
        //get start and finish node ,call dijkstra
        //and backtracking helper to get shortest path
        let start_node=grid[START_NODE_ROW][START_NODE_COL]
        let finish_node=grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        let visitedNodeInorder=dijkstra(grid,start_node,finish_node)
        let shortestpath=getNodesInShortestPathOrder(finish_node)
        this.animateDijikstra(visitedNodeInorder,shortestpath) 

    }



    //animate
    animateDijikstra=(visitedNodeInorder,shortestpath)=>{
        for(let i=0;i<visitedNodeInorder.length;i++){
            setTimeout(() => {
                document.getElementById(`node-${visitedNodeInorder[i].row}-${visitedNodeInorder[i].column}`).classList.add('node-visited')
                if(i===visitedNodeInorder.length-1){
                    this.animateShortestPath(shortestpath)        
            }


            }, i*ANIMATION_SPEED);
        }
    }



 //------------------------------------------------------DEPTH FIRST SEARCH--------------------------------------------------

    //visualize
    visualizeDfs=()=>{
        const {grid}=this.state
        this.clearPath()
        RUNNING=true
        CURRENT_ALGO="DFS"
        let start_node=grid[START_NODE_ROW][START_NODE_COL]
        let finish_node=grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        let visitedNodeInorder=depthFirstSearch(grid,start_node,finish_node)
        let shortestpath=getNodesInShortestPathOrder(finish_node)
        this.animateDfs(visitedNodeInorder,shortestpath)
    }


    //animate DFS
    animateDfs=(visitedNodeInorder,shortestpath)=>{
        
        for(let i=0;i<visitedNodeInorder.length;i++){

            setTimeout(() => {
                document.getElementById(`node-${visitedNodeInorder[i].row}-${visitedNodeInorder[i].column}`).classList.add('node-visited')
                if(i===visitedNodeInorder.length-1){
                    this.animateShortestPath(shortestpath)
            }

            }, i*ANIMATION_SPEED);
        }
    }


//-----------------------------------------------------BREADTH FIRST SEARCH--------------------------------------------------------------
    visualizeBfs=()=>{
        const {grid}=this.state
        this.clearPath()
        RUNNING=true
        CURRENT_ALGO="BFS"
        let start_node=grid[START_NODE_ROW][START_NODE_COL]
        let finish_node=grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        
        let visitedNodeInorder=breadthFirstSearch(grid,start_node,finish_node)
        let shortestpath=getNodesInShortestPathOrder(finish_node)
        this.animateBfs(visitedNodeInorder,shortestpath)

    }


    //animate BFS
    animateBfs=(visitedNodeInorder,shortestpath)=>{
        
        for(let i=0;i<visitedNodeInorder.length;i++){

            setTimeout(() => {
                document.getElementById(`node-${visitedNodeInorder[i].row}-${visitedNodeInorder[i].column}`).classList.add('node-visited')
                if(i===visitedNodeInorder.length-1){
                    this.animateShortestPath(shortestpath)
            }

            }, i*ANIMATION_SPEED);
        }
    }


    //--------------------------------------------------------------------ASTAR--------------------------------------------------------
    visualizeAstar=()=>{
        const {grid}=this.state
        this.clearPath()
        RUNNING=true
        CURRENT_ALGO="ASTAR"
        let start_node=grid[START_NODE_ROW][START_NODE_COL]
        let finish_node=grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        let visitedNodesInorder=astar(grid,start_node,finish_node)
        let shortestpath=getNodesInShortestPathOrder(finish_node)
        this.animateAstar(visitedNodesInorder,shortestpath)
    }

    //animate Astar
    animateAstar=(visitedNodeInorder,shortestpath)=>{
        
        for(let i=0;i<visitedNodeInorder.length;i++){

            setTimeout(() => {
                document.getElementById(`node-${visitedNodeInorder[i].row}-${visitedNodeInorder[i].column}`).classList.add('node-visited')
                if(i===visitedNodeInorder.length-1){
                    //animate shortest path
                    this.animateShortestPath(shortestpath)
            }

            }, i*ANIMATION_SPEED);
        }
    }

 //==================================================animate ShortestPath (BACKTRACKING)=========================================
    animateShortestPath=(shortestpath)=>{

        for(let i=0;i<shortestpath.length;i++){
            setTimeout(() => {
                document.getElementById(`node-${shortestpath[i].row}-${shortestpath[i].column}`).classList.add('shortest-path')

            // after 10msec enabling all the button  
            if(i===shortestpath.length-1){
                setTimeout(()=>{
                    FINISH=true  
                    this.setState({is_running:false})
                    RUNNING=false   
                    
                },10)
            }

            }, i*FINAL_PATH_ANIM_SPEED);
            
        }
    }

//==================================================================MAZES===========================================================
//-------------------------------------------------------------RECURSSIVE Division------------------------------------

visualizeRecurssiveDivision=async()=>{
    await this.clearGrid()
    RUNNING=true
    const {grid}=this.state   
   let visitednodes=recursiveDivisionMaze(grid,2,ROW-1,2,COL-1,"horizontal",false,[])
   this.animateRecurssiveDivision(visitednodes)

}




//-----------------------------------------Recurssive Division (Vertical skew and horizontal skew)--------------------

visualizeRecurssiveDivisionVertical=async()=>{
    await this.clearGrid()
    RUNNING=true
    const {grid}=this.state   
   let visitednodes=recurssiveVerticalSkew(grid,2,ROW-1,2,COL-1,"vertical",false,[])
   this.animateRecurssiveDivision(visitednodes)

}

visualizeRecurssiveDivisionHorizontal=async()=>{
    await this.clearGrid()
    RUNNING=true
    const {grid}=this.state   
   let visitednodes=recurssiveHorizontalSkew(grid,2,ROW-1,2,COL-1,"horizontal",false,[])
   this.animateRecurssiveDivision(visitednodes)

}



//----------------------animate maze generation--------------------------------------
animateRecurssiveDivision=(visitedNodeInorder)=>{
        
    for(let i=0;i<visitedNodeInorder.length;i++){
        visitedNodeInorder[i].isWall=true
        setTimeout(() => {
            
            document.getElementById(`node-${visitedNodeInorder[i].row}-${visitedNodeInorder[i].column}`).classList.add('node-wall')

            // after 10 msec enabling all the button  
            if(i===visitedNodeInorder.length-1){
                setTimeout(()=>{
                    this.setState({is_running:false})
                    RUNNING=false
                },10)
            }
            
        }, i*ANIMATION_SPEED);
    }
}

//-------------------------------------------------------------RANDOM MAZE----------------------------------------------------------------
visualizeRandomMaze=async()=>{
    await this.clearGrid()
    const {grid}=this.state
    let walls=randomMaze(grid)
    for(let i=0;i<walls.length;i++){
        walls[i].isWall=true
        document.getElementById(`node-${walls[i].row}-${walls[i].column}`).classList.add('node-wall')
    }
    this.setState({is_running:false})
}

//-------------------------------------------------------------PRIM'S ALGO----------------------------------------------
visulizeprimsalgo=async ()=>{
    await this.clearGrid()
    RUNNING=true
    const {grid}=this.state
    // console.log(primsalgo(this.state.grid,grid[START_NODE_ROW][START_NODE_COL],grid[FINISH_NODE_ROW][FINISH_NODE_COL]))
    let prims=primsalgo(this.state.grid,grid[START_NODE_ROW][START_NODE_COL],grid[FINISH_NODE_ROW][FINISH_NODE_COL])
    await this.makewall(prims)
    
    setTimeout(()=>{
        this.animatePrims(prims.removedWalls)
    },50)
       
    
}

makewall=(prims)=>{
    for(let i=0;i<prims.addedWalls.length;i++){
        document.getElementById(`node-${prims.addedWalls[i].row}-${prims.addedWalls[i].column}`).classList.add('node-wall')
}
}

animatePrims=(removedWalls)=>{
        
    for(let i=0;i<removedWalls.length;i++){
        removedWalls[i].isWall=false
        setTimeout(() => {
            
            document.getElementById(`node-${removedWalls[i].row}-${removedWalls[i].column}`).classList.remove('node-wall')

            // after 10 msec enabling all the button  
            if(i===removedWalls.length-1){
                setTimeout(()=>{
                    this.setState({is_running:false})
                    RUNNING=false
                },10)
            }
            
        }, i*ANIMATION_SPEED);
    }
}






//------------------------------------------------------------MOUSE EVENTS------------------------------------------------------------
    //---------MOUSE DOWN----------

    handleMouseDown(row, column,e) {
        const {grid}=this.state
        e.preventDefault();

        //if any animation is running then disable the event listners
        if(RUNNING) return

        //if it is start nod then we want to move the start node on mouse enter (on mouse press)
        if(grid[row][column].start){
            START=true
            MOUSE_PRESSED=true
        }

        //if it is start nod then we want to move the start node on mouse enter (on mouse press)
        else if(grid[row][column].end){
            END=true
            MOUSE_PRESSED=true
        }

        //else toggle the wall
        else{
            getnewgridwithwallToggled(this.state.grid, row, column);
            MOUSE_PRESSED=true
        }
    }

    //------------MOUSE ENTER--------------

     handleMouseEnter(row, column) {

        //if any animation is running then disable the event listners
        if(RUNNING) return
        const {grid}= this.state
        
        //if mouse is not pressed on enter then return
        if (!(MOUSE_PRESSED)) return;

        //to fix the start and end node overlapping one another
        if(grid[row][column].end) return;
        if(grid[row][column].start)return;

        //if entering with start node
        if(START){
            //wall return
            if(grid[row][column].isWall) return

            //remove start from previous 
            document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).classList.remove('node-start')
            grid[START_NODE_ROW][START_NODE_COL].start=false

            //assign new start 
            START_NODE_ROW=row
            START_NODE_COL=column
            document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).classList.add('node-start')
          
            //instant path IF animation is finished start Node
            if(FINISH){
                this.instantPathStart(row,column,CURRENT_ALGO)
            }
            return
        }

        //if entering with finish node
        else if(END){
            //wall
            if(grid[row][column].isWall) return

            //remove finish from previous
            document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).classList.remove('node-end')
            grid[FINISH_NODE_ROW][FINISH_NODE_COL].end=false

            //assign new finish node
            FINISH_NODE_ROW=row
            FINISH_NODE_COL=column
            document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).classList.add('node-end')

             //instant path IF animation is finished finish Node
            if(FINISH){
                this.instantPathDestination(row,column,CURRENT_ALGO)
            }
            return
        }

        else{
            getnewgridwithwallToggled(this.state.grid, row, column);
        }
      }
    

    //----Mouse Up-----
    handleMouseUp() {
        //if any animation is running then disable the event listners
        if(RUNNING) return
        const {grid}= this.state;
       
        //assign the final start node 
        if(START){ 
            grid[START_NODE_ROW][START_NODE_COL].start=true
            grid[START_NODE_ROW][START_NODE_COL].isWall=false
            START=false
            MOUSE_PRESSED=false 
            return
        }

        //assign the final finish node
        else if(END){
            grid[FINISH_NODE_ROW][FINISH_NODE_COL].end=true
            END=false
            MOUSE_PRESSED=false 
            return
        }     
        MOUSE_PRESSED=false 
      }




    //------------------------------------------------------------CLEAR PATH-------------------------------------------------------------

    clearPath=()=>{
        const {grid}=this.state
        CURRENT_ALGO=""
        FINISH=false
        let nodes=getallNodes(grid)
        for(let node of nodes){
            if(node.isWall) continue;
             grid[node.row][node.column]=createNode(node.row,node.column)
            document.getElementById(`node-${node.row}-${node.column}`).classList.remove('shortest-path')
            document.getElementById(`node-${node.row}-${node.column}`).classList.remove('node-visited')
        }

    }






//===================================================INSTANT PATH (WHEN WE MOVE START NODE)=============================

instantPathStart=(row,column,algorithm)=>{
    const {grid}=this.state

    if(algorithm==="DIJKSTRA"){
        this.clearPath()
        //bcz clear path clers the current algo and finsih
        CURRENT_ALGO="DIJKSTRA"
        FINISH=true

        //get the start node and finish node and animate without set timeout
        let startNode=grid[row][column]
        let finishNode=grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        let visitednodes= dijkstra(grid,startNode,finishNode)
        let shortestpath= getNodesInShortestPathOrder(finishNode)
        for(let node of visitednodes){
            document.getElementById(`node-${node.row}-${node.column}`).classList.add('node-visited')
        }
        for(let node of shortestpath){
            document.getElementById(`node-${node.row}-${node.column}`).classList.add('shortest-path')
        }
    }


    else if(algorithm==="ASTAR"){
        this.clearPath()
         //bcz clear path clers the current algo and finsih
        CURRENT_ALGO="ASTAR"
        FINISH=true
          //get the start node and finish node and animate without set timeout
        let startNode=grid[row][column]
        let finishNode=grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        let visitednodes= astar(grid,startNode,finishNode)
        let shortestpath= getNodesInShortestPathOrder(finishNode)
        for(let node of visitednodes){
            document.getElementById(`node-${node.row}-${node.column}`).classList.add('node-visited')
        }
        for(let node of shortestpath){
            document.getElementById(`node-${node.row}-${node.column}`).classList.add('shortest-path')
        }
    }

    else if(algorithm==="DFS"){
        this.clearPath()
        //bcz clear path clers the current algo and finsih
        CURRENT_ALGO="DFS"
        FINISH=true
        //get the start node and finish node and animate without set timeout
        let startNode=grid[row][column]
        let finishNode=grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        let visitednodes= depthFirstSearch(grid,startNode,finishNode)
        let shortestpath= getNodesInShortestPathOrder(finishNode)
        for(let node of visitednodes){
            document.getElementById(`node-${node.row}-${node.column}`).classList.add('node-visited')
        }
        for(let node of shortestpath){
            document.getElementById(`node-${node.row}-${node.column}`).classList.add('shortest-path')
        }
    }

    else if(algorithm==="BFS"){
        this.clearPath()
        //bcz clear path clers the current algo and finsih
        CURRENT_ALGO="BFS"
        FINISH=true
        //get the start node and finish node and animate without set timeout
        let startNode=grid[row][column]
        let finishNode=grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        let visitednodes= breadthFirstSearch(grid,startNode,finishNode)
        let shortestpath= getNodesInShortestPathOrder(finishNode)
        for(let node of visitednodes){
            document.getElementById(`node-${node.row}-${node.column}`).classList.add('node-visited')
        }
        for(let node of shortestpath){
            document.getElementById(`node-${node.row}-${node.column}`).classList.add('shortest-path')
        }
    }
}




//===================================================INSTANT PATH (WHEN WE MOVE FINISH  NODE)=============================
        
instantPathDestination=(row,column,algorithm)=>{
        const {grid}=this.state
        if(algorithm==="DIJKSTRA"){
            this.clearPath()
            //bcz clear path clears the current algo and finsih
            CURRENT_ALGO="DIJKSTRA"
            FINISH=true
            //get the start node and finish node and animate without set timeout
            let startNode=grid[START_NODE_ROW][START_NODE_COL]
            let finishNode=grid[row][column]
            let visitednodes= dijkstra(grid,startNode,finishNode)
            let shortestpath= getNodesInShortestPathOrder(finishNode)
            for(let node of visitednodes){
                document.getElementById(`node-${node.row}-${node.column}`).classList.add('node-visited')
            }
            for(let node of shortestpath){
                document.getElementById(`node-${node.row}-${node.column}`).classList.add('shortest-path')
            }
        }


        else if(algorithm==="ASTAR"){
            this.clearPath()
            //bcz clear path clears the current algo and finsih
            CURRENT_ALGO="ASTAR"
            FINISH=true
            let startNode=grid[START_NODE_ROW][START_NODE_COL]
            let finishNode=grid[row][column]
            let visitednodes= astar(grid,startNode,finishNode)
            let shortestpath= getNodesInShortestPathOrder(finishNode)
            for(let node of visitednodes){
                document.getElementById(`node-${node.row}-${node.column}`).classList.add('node-visited')
            }
            for(let node of shortestpath){
                document.getElementById(`node-${node.row}-${node.column}`).classList.add('shortest-path')
            }
        }

        else if(algorithm==="DFS"){
            this.clearPath()
            //bcz clear path clears the current algo and finsih
            CURRENT_ALGO="DFS"
            FINISH=true
            //get the start node and finish node and animate without set timeout
            let startNode=grid[START_NODE_ROW][START_NODE_COL]
            let finishNode=grid[row][column]
            let visitednodes= depthFirstSearch(grid,startNode,finishNode)
            let shortestpath= getNodesInShortestPathOrder(finishNode)
            for(let node of visitednodes){
                document.getElementById(`node-${node.row}-${node.column}`).classList.add('node-visited')
            }
            for(let node of shortestpath){
                document.getElementById(`node-${node.row}-${node.column}`).classList.add('shortest-path')
            }
        }

        else if(algorithm==="BFS"){
            this.clearPath()
            //bcz clear path clears the current algo and finsih
            CURRENT_ALGO="BFS"
            FINISH=true
            //get the start node and finish node and animate without set timeout
            let startNode=grid[START_NODE_ROW][START_NODE_COL]
            let finishNode=grid[row][column]
            let visitednodes= breadthFirstSearch(grid,startNode,finishNode)
            let shortestpath= getNodesInShortestPathOrder(finishNode)
            for(let node of visitednodes){
                document.getElementById(`node-${node.row}-${node.column}`).classList.add('node-visited')
            }
            for(let node of shortestpath){
                document.getElementById(`node-${node.row}-${node.column}`).classList.add('shortest-path')
            }
        }
    }

//handle tutorial
handleTut=()=>{
    this.setState({load:false})
}


 //===========================================================RENDER=======================================================================   
    render() {

        const {grid}=this.state
        return (
            <>
                <NavBar 
                clearGrid={this.clearGrid}
                clearPath={this.clearPath}
                astar={this.visualizeAstar}
                dijkstra={this.visualizeDijikstra}
                bfs={this.visualizeBfs}
                dfs={this.visualizeDfs}
                recurDivMaze={this.visualizeRecurssiveDivision}
                randomMaze={this.visualizeRandomMaze}
                recurDivMazeVertical={this.visualizeRecurssiveDivisionVertical}
                recurDivMazeHorizontal={this.visualizeRecurssiveDivisionHorizontal}
                primsAlgo={this.visulizeprimsalgo}
                is_running={this.state.is_running}
                ></NavBar>
                {/* <button onClick={this.visulizeprimsalgo}>prim</button> */}

                <table id="grid">
                <tbody>
                {this.state.load?<Tutorial handleTut={this.handleTut}></Tutorial>:null}
                {grid.map((row,rowIdx)=>{
                return  <tr key={rowIdx} id={rowIdx}>
                        {row.map((node,nodeIdx)=>{
                
                            const {
                                start,
                                end,
                                row,
                                column,
                                isVisited,
                                isWall,
                   }=node
                            return <Node 
                            isStart={start}
                            isEnd={end}
                            row={row}
                            column={column}
                            isVisited={isVisited}
                            isWall={isWall}
                            onMouseDown={(row,column,e)=>{this.handleMouseDown(row,column,e)}}
                            onMouseUp={()=>{this.handleMouseUp()}}
                            onMouseEnter={(row,column)=>{this.handleMouseEnter(row,column)}}
                            key={nodeIdx} 
                            ></Node>

                        })}
                    </tr>
                })}
                </tbody>
                </table>
                
            </>
        )
    }
}

export default PathfindingVisualizer




//------------------------------------------------------INITALIZE GRID-------------------------------------------------
const initializeGrid=()=>{
    let node=[]
    for(let row=0;row<=ROW;row++){
        let currentRow=[]
        for(let column=0;column<=COL;column++){
            currentRow.push(createNode(row,column))
        }
        node.push(currentRow)

    }
    return node
}


//------------------------------------------------------Node Properties----------------------------------------
const createNode=(row,column)=>{
    return{
        row,
        column,
        start:row===START_NODE_ROW && column===START_NODE_COL,
        end:row===FINISH_NODE_ROW && column===FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
        h:null,
        f:null,
    }
}


//---------------------------------------------------------------Wall TOggle Function----------------------------------------
const  getnewgridwithwallToggled=(grid,row,column)=>{

    if(!(grid[row][column].start) && !(grid[row][column].end)){

     grid[row][column].isWall=! grid[row][column].isWall

     if(grid[row][column].isWall){
        document.getElementById(`node-${row}-${column}`).classList.add('node-wall')
    }
    else{
        document.getElementById(`node-${row}-${column}`).classList.remove('node-wall')
    }

    }
    

   

}