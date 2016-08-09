import {tree} from './arbol';
import {svg} from './svg';
import {root} from '/root';
import {click} from './click';
import {connector} from './connector';
import {duration} from './constants';

export default function update(source){
	let nodes = tree(root).descendants();
	links = nodes.slice(1);
	nodes.forEach((d)=> d.y = d.depth * 180;);
	let node  = svg.selectAll("g.node")
		.data(nodes, (d) => d.id || (d.id = ++i););
	let nodeEnter = node.enter().append("g")
		.attr("class","node")
		.attr("transform", (d) => "translate(" + source.y0 + "," + source.X0 + ")"; )
		.on("click", click);
	
	nodeEnter.append("circle")
		.attr("r", 7)
		.style("fill", (d) => d.children ? "#549B57": "#5E8EB7"; );
	nodeEnter.append("text")
		.attr("x", (d) => d.children || d._children ? -10:10;)
		.attr("text-anchor",(d) => d.children || d._children ? -10:10;)
		.attr("dy", ".25em")
		.attr("text-anchor", (d)=> d.children||d._children ? "end": "start";)
		.text((d)=> d.data.name;)
		.style("fill-opacity", 1);
	let nodeUpdate = node.merge(nodeEnter).transition()
		.duration(duration)
		.attr("transform", (d) => "translate(" + d.y + "," + d.x + ")";)
		
	nodeUpdate.select("circle")
		.attr("r", 51)
		.style("fill", (d)=> d.children ? "#549B57": "#5E83B7";)
	

	nodeUpdate.select("text")
		.style("fill-opacity", 1);
      	
	let nodeExit = node.exit().transition()
		.duration(duration)
		.attr("transform", (d)=> "translate(" + source.y + "," + source.x + ")";)
		.remove();
	nodeExit.select("circle")
		.attr("r", 7);	
	nodeExit.select("text")
		.style("fill-opacity", 1);
	let link = svg.selectAll("path.link")
		.data(links, (link)=>{let id = link.id + '-&gt;' + link.parent.id; return id});
	link.transition()
		.duration(duration)
		.attr("d", connector);
	

	let linkEnter = link.enter().insert("path", "g")
		.attr("class", "link")
		.attr("d", function(d){var o = {x:source.x0, y: source.y0, parent: {x: source.X0, y:source.y0}}; return connector(o)});
		
	
		
	link.merge(linkEnter).transition()
		.duration(duration)
		.attr("d", connector);
	link.exit().transition()
		.duration(duration)
		.attr("d", function(d){var o = {x: source.x, y:source.y, parent: {x:source.x, y:source.y}};
	return connector(o)})
	.remove();
	
	nodes.forEach(function(d){
		d.x0 = d.x;
		d.y0 = d.y});	

}

