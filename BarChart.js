function BarChart(data, containerId){
	
	this.setContainer = function(containerId){
		this.container = d3.select(containerId);
		this.height = this.container.attr("height");
		this.width = this.container.attr("width");
	}
	
	this.setContainer(containerId);
	
	this.setData = function(data){
		this.data = data;
		
		this.yScale = d3.scaleLinear()
		.range([0, this.height])
		.domain([0,d3.max(data, function(d){return d.value;})]);
		
		this.xScale = d3.scaleBand()
		.rangeRound([0, this.width])
		.domain(data.map(function(d){return d.name;}));
	}
	
	this.setData(data);
	
	this.create = function(){
		
		this.container.selectAll("g")
		.data(this.data)
		.enter()
		.append("g")
		.attr("transform", function(d){ return "translate(" + this.xScale(d.name) + ",0)";})
		.append("rect")
		.attr("y", function(d){return this.yScale(d.value)})
		.attr("height", function(d){ return this.height - yScale(d.value);})
		.attr("width", this.xScale.range());	
		
	}
}