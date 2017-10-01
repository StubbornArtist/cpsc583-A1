function MatrixData(){
	
	var pairs = [];
	var rows = [];
	var columns = [];
	
	this.parseCSV = function(data, rowsLabel){
						
		data.forEach(function (d){
				
			var row = new Collection(d[rowsLabel]);
				
			for (var key in d){
					
				if(key !== rowsLabel){
						
					var index = columns.map(function(d){return d.name;}).indexOf(key);
					if( index === -1){
						index = columns.length;
						columns.push(new Collection(key));
					}
					columns[index].addMember(d[rowsLabel], +d[key]);
						
					pairs.push(new Pair(d[rowsLabel], key, +d[key]));
						
					row.addMember(key, +d[key]);
					}
				}	
				rows.push(row);
			});	
	}
	this.pairs = function(){
		return pairs;
	}
	this.columns = function(){
		return columns;
	}
	this.rows = function(){
		return rows;
	}
	this.findColumn = function(name){
		return columns.find(function(d){return d.name === name;})
	}
	
	this.findRow = function(name){
		return rows.find(function(d){return d.name === name;});
	}
	
	this.findPair = function(row, column){
		return pairs.find(function(d){ return d.row === row && d.column === column });
	}
}

function Pair(row, column, value){
	
	this.row = row;
	this.column = column;
	this.value = value;
}

function Collection(name){
	this.name = name;
	this.members = [];
	
	this.addMember = function(name, value){
		this.members.push({name : name, value : value});
		this.value = getAverage(this.members);
	}

	function getAverage(members){
		var values = members.map(function(d){return d.value});
		return d3.mean(values);
	}
}
