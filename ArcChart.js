function ArcChart(data, startAngle, endAngle, innerRadius, outerRadius, containerId){
	
	this.data = data;
	this.startAngle = startAngle;
	this.endAngle = endAngle;
	this.innerRadius = innerRadius;
	this.outerRadius = outerRadius;
	
	this.classes = "arc";
	
	
	this.setContainer = function(containerId){
		this.container = d3.select(containerId);
	}
	
	this.setContainer(containerId);
	
	
	this.create = function(){
		
		var values = this.data.map(function(d){return d.value;});
		var min = d3.min(values);
		var max = d3.max(values);
		var scale = d3.scaleLinear()
					.domain([max, min])
					.range([this.outerRadius, this.innerRadius + 5]);
					
		var pie = d3.pie()
					.startAngle(this.startAngle)
					.endAngle(this.endAngle)
					.value(function(d){return d.value;})
					.sort(null);
					
		var arc = d3.arc()
					.innerRadius(this.innerRadius)
					.outerRadius(function(d){ return scale(d.value);});
											
		this.container.selectAll("g.arc")
			.data(pie(this.data))
			.enter()
			.append("g")
			.attr("class", this.classes)
			.attr("transform", "translate( " + this.outerRadius +  "," + this.outerRadius + ")")
			.append("path")
			.attr("d", arc);

	}
	
	this.addClass = function(className){
		
		this.classes += " " + className;
		
	}
	
	this.addTitle = function(title){
		var arc = d3.arc()
						.innerRadius(this.outerRadius + 30)
						.outerRadius(this.outerRadius )
						.startAngle(d3.max([this.endAngle, this.startAngle]))
						.endAngle(d3.min([this.startAngle, this.endAngle]));
						
		var g = this.container.append("g")
						.attr("transform", "translate(" + this.outerRadius + "," + this.outerRadius + ")");
						
						g.append("path")
						.attr("d", arc)
						.attr("id", "path_" + title)
						.style("fill", "none");
						
						g.append("text")
						.append("textPath")
						.attr("xlink:href", "#path_" + title)
						.attr("startOffset", "75%")
						.text(title);
					  
	}
}