function ArcChart(data, title, startAngle, endAngle, innerRadius, outerRadius, containerId){
	
	this.data = data;
	this.title = title;
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
		
		var pie = d3.pie()
					.startAngle(this.startAngle)
					.endAngle(this.endAngle)
					.value(function(d){return d.value;});
					
		var arc = d3.arc()
					.innerRadius(this.innerRadius)
					.outerRadius(this.outerRadius);
					
					
		this.container.selectAll("g.arc")
			.data(pie(this.data))
			.enter()
			.append("g")
			.attr("class", this.classes)
			.attr("transform", "translate( " + this.outerRadius +  "," + this.outerRadius + ")")
			.append("path")
			.attr("d", arc)
			.attr("id", this.title + "-path");
			
		this.container.append("text")
			.append("textPath")
			.attr("xlink:href", this.title + "-path")
			.style("text-anchor", "middle")
			.attr("startOffset", "50%")
			.text(this.title);
			
	}
	
	this.addClass = function(className){
		
		this.classes += " " + className;
		
	}
}