import './NavBar.css'
import React, { Component } from 'react'
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';
import homeimg from '../Node/images/initial.png'
import desinationimg from '../Node/images/destination.png'
import shortestpathimg from '../Node/images/yellow.png'
import visitednodeimg from '../Node/images/purple.png'
import wallimg from '../Node/images/wall.png'

export class NavBar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             is_running:false
        }
    }
    

    componentWillReceiveProps(props) {
        if(this.state.is_running===false) return
        this.setState({is_running: props.is_running })
      }
    
    render() {
        const {clearGrid,clearPath,astar,dijkstra,bfs,dfs,recurDivMaze,randomMaze,recurDivMazeVertical,recurDivMazeHorizontal,primsAlgo}=this.props
        const  {is_running}=this.state
        let op=is_running?"0.2":"1"
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                    <Navbar.Brand id="header" onClick={()=>{window.location.reload()}}>Pathfinding Visualizer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse  id="responsive-navbar-nav" >
                        <Nav className="mr-auto">
                            <NavDropdown style={{opacity:op}} title="Pick an Algorithm to Visualize" id="collasible-nav-dropdown">
                                <NavDropdown.Item  onClick={!is_running ? ()=>{this.setState({is_running:true})
                                    return astar()}:null} variant="dark">A* Search</NavDropdown.Item>

                                <NavDropdown.Item   onClick={!is_running ? ()=>{this.setState({is_running:true})
                                    return dijkstra()}:null} >Dijkstra's Algorithm</NavDropdown.Item>

                                <NavDropdown.Item   onClick={!is_running ? ()=>{this.setState({is_running:true})
                                    return bfs()}:null}>Breadth-first Search</NavDropdown.Item>

                                <NavDropdown.Item eventKey={3}  onClick={!is_running ? ()=>{this.setState({is_running:true})
                                    return dfs()}:null} >Depth-first Search</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown style={{opacity:op}} title="Generate Mazes" id="collasible-nav-dropdown">

                                <NavDropdown.Item   onClick={!is_running ? ()=>{this.setState({is_running:true})
                                    return primsAlgo()}:null}>Prim's Algorithm</NavDropdown.Item>

                                <NavDropdown.Item   onClick={!is_running ? ()=>{this.setState({is_running:true})
                                    return recurDivMaze()}:null}>Recurssive Division</NavDropdown.Item>

                                <NavDropdown.Item   onClick={!is_running ? ()=>{this.setState({is_running:true})
                                    return randomMaze()}:null} >Random Maze</NavDropdown.Item>
                                    
                                <NavDropdown.Item   onClick={!is_running ? ()=>{this.setState({is_running:true})
                                    return recurDivMazeVertical()}:null}>Recurssive Division (Vertical-skew)</NavDropdown.Item>

                                <NavDropdown.Item   onClick={!is_running ? ()=>{this.setState({is_running:true})
                                    return recurDivMazeHorizontal()}:null}>Recurssive Division (Horizontal-skew)</NavDropdown.Item>
                                
                            </NavDropdown>
                        </Nav>
                        <Nav>
                        <Nav.Link style={{opacity:op}} onClick={!is_running ? ()=>clearPath():null}>Clear Path</Nav.Link>

                        <Nav.Link style={{opacity:op}} eventKey={2} onClick={!is_running ? ()=>clearGrid():null}>
                            Clear Board
                        </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <div className="notations">
                    <div className="notation">
                        <img src={homeimg} alt="source"></img>
                        <span>Starting Point</span>
                    </div>
                    <div className="notation">
                    <img src={desinationimg} alt="destination"></img><span>Destination</span>
                    </div>
                    <div className="notation">
                    <img src={shortestpathimg} alt="shortpath"></img><span>Shortest Path</span>
                    </div>
                    <div className="notation">
                    <img src={visitednodeimg} alt="visited"></img><span> Visited Nodes</span>
                    </div>
                    <div className="notation">
                    <img src={wallimg} alt="wall"></img><span> Wall</span>
                    </div>
                </div>


            </>
        )
    }
}

export default NavBar
