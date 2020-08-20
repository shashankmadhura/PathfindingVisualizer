import React, { Component } from 'react'
import './Tutorial.css';
import walldraw from '../Node/images/drawwalls.gif'
import instantpath from '../Node/images/instant.gif'

export class Tutorial extends Component {
    render() {
        const {handleTut}=this.props
        return (
            <>
                <div className="tut">
                    <div className="tut__heading"> 
                        <h2> QUICK GUIDE</h2>
                        <button onClick={()=>{handleTut()}}>Skip</button>
                    </div>
                    <div className="tut__content">
                        <div className="tutcontent">
                            <h4>A* Search Algorithm</h4>
                            <p>A* Search algorithm is one of the best and popular technique used in path-finding and graph traversals.
                            A* Search algorithms, unlike other traversal techniques, it has “brains”. What it means is that it is really a smart algorithm which separates it from the other conventional algorithms.
                            </p>
                        </div>
                        <div className="tutcontent">
                            <h4>Dijkstra's Shortest Path Algorithm</h4>
                            <p>One algorithm for finding the shortest path from a starting node to a target node in a weighted graph is Dijkstra’s algorithm. The algorithm creates a tree of shortest paths from the starting vertex, the source, to all other points in the graph.
                            </p>
                        </div>
                        <div className="tutcontent">
                            <h4>Breadth First Search</h4>
                            <p>BFS is a traversing algorithm where you should start traversing from a selected node (source or starting node) and traverse the graph layerwise thus exploring the neighbour nodes (nodes which are directly connected to source node). You must then move towards the next-level neighbour nodes.
                            </p>
                        </div>
                        <div className="tutcontent">
                            <h4>Depth First Search </h4>
                            <p>Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking.
                            </p>
                        </div>

                        <div className="images">
                            <h4>How to draw walls ?</h4>
                            <img src={walldraw} alt="walldrawgif"></img>
                            <h4>How to get  shortest path instantly ?</h4>
                            <img src={instantpath} alt="instantpath"></img>
                        </div>
                        <div className="tutcontent">
                            <h4>How to Visualize ? </h4>
                            <p>Just pick an algorithm from drop down to Visualize.</p>
                            <p>To Visualize maze generation pick any of the maze generation algorithm from dropdown</p>
                        </div>
                    </div>
                  

                        <button onClick={()=>{handleTut()}}>Finish</button>   
                    
                </div>
            </>
        )
    }
}

export default Tutorial
