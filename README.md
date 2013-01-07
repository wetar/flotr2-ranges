Flotr2-ranges
=============

A range chart type for Flotr2 https://github.com/HumbleSoftware/Flotr2

The range chart type displays a range of data by filling the range between two Y values.

Example
-------

```javascript
var data1 = [[0, 3, 1], [4, 8, 7], [8, 5 ,2], [9, 13,8]];
Flotr.draw(
	document.getElementById("holder"), 
	[ data1 ], 
	{
		ranges: {
			show: true,
			fillColor: ['#00A8F0', '#00A8F0'],
			fillOpacity: 0.1,
			fillBorder: true
		}
	}
);
```

