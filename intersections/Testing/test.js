var examples = {
  first: [
    { x: 60,  y: 60  },
    { x: 180, y: 0   },
    { x: 300, y: 60  },
    { x: 300, y: 300 },
    { x: 240, y: 180 },
    { x: 210, y: 180 },
    { x: 180, y: 240 },
    { x: 150, y: 180 },
    { x: 120, y: 180 },
    { x: 60,  y: 300 },
  ],
  second: [
    { x: 30,  y: 240 },
    { x: 330, y: 240 },
    { x: 330, y: 210 },
    { x: 270, y: 90  },
    { x: 210, y: 270 },
    { x: 210, y: 90  },
    { x: 180, y: 60  },
    { x: 150, y: 90  },
    { x: 150, y: 270 },
    { x: 90,  y: 90  },
    { x: 30,  y: 210 }
  ]

};


describe("intersects", function() {

  it("Find intersections", function() {
    assert.deepEqual(intersects(examples.first, examples.second),
    	[
    [
      { x: 60,  y: 240 },
      { x: 90,  y: 240 },
      { x: 120, y: 180 },
      { x: 90,  y: 90  },
      { x: 60,  y: 150 },
    ],
    [
      { x: 270, y: 240 },
      { x: 300, y: 240 },
      { x: 300, y: 150 },
      { x: 270, y: 90  },
      { x: 240, y: 180 },
    ],
    [
      { x: 150, y: 180 },
      { x: 180, y: 240 },
      { x: 210, y: 180 },
      { x: 210, y: 90  },
      { x: 180, y: 60  },
      { x: 150, y: 90  }
    ]
  ]);
  });

});

describe('intersections of segment', function(){
	it('Seg1 (300;300)(300;60) Seg2(330;240)(30;240)',function(){
		assert.deepEqual(segmentsIntersect(
			[{ x: 300, y: 300 },{ x: 300, y: 60 }],
			[{ x: 330, y: 240 },{ x: 30, y: 240 }]
			),{x:300, y:240})
	})
	it('Seg1 (300;300)(300;60) Seg2(270;90)(330;210)',function(){
		assert.deepEqual(segmentsIntersect([{ x: 300, y: 300 },{ x: 300, y: 60 }],
			[{ x: 270, y: 90 },{ x: 330, y: 210 }]
			),{x:300, y:150})
	})
	it('Seg1 (240;108)(300;300) Seg2(330;240)(30;240)',function(){
		assert.deepEqual(segmentsIntersect(
			[{ x: 240, y: 180 },{ x: 300, y: 300 }],
			[{ x: 330, y: 240 },{ x: 30, y: 240 }]
			),{x:270, y:240})
	})
	it('Seg1 (240;180)(300;300) Seg2(240;270)(270;90)',function(){
		assert.deepEqual(segmentsIntersect(
			[{ x: 240, y: 180 },{ x: 300, y: 300 }],
			[{ x: 210, y: 270 },{ x: 270, y: 90 }]
			),{x:240, y:180})
	})
	it('Seg1 (300;300)(300;60) Seg2(330;210)(330;240)',function(){
		assert.equal(segmentsIntersect(
			[{ x: 300, y: 300 },{ x: 300, y: 60 }],
			[{ x: 330, y: 210 },{ x: 330, y: 240 }]
			),null)
	})	
})

describe('point classify', function(){
	it('Point (40;40) Seg(30;30)(100;100)',function(){
		assert.equal(classifyPoint({ x: 40, y: 40}, [{ x: 30, y: 30 },{ x: 100, y: 100 }]), PointClassify.Belong)
	})
	it('Point (40;50) Seg(30;30)(100;100)',function(){
		assert.equal(classifyPoint({ x: 40, y: 50}, [{ x: 30, y: 30 },{ x: 100, y: 100 }]), PointClassify.Left)
	})
	it('Point (60;30) Seg(30;30)(100;100)',function(){
		assert.equal(classifyPoint({ x: 60, y: 30}, [{ x: 30, y: 30 },{ x: 100, y: 100 }]), PointClassify.Right)
	})
	it('Point (10;10) Seg(30;30)(100;100)',function(){
		assert.equal(classifyPoint({ x: 10, y: 10}, [{ x: 30, y: 30 },{ x: 100, y: 100 }]), PointClassify.Behind)
	})
	it('Point (110;110) Seg(30;30)(100;100)',function(){
		assert.equal(classifyPoint({ x: 110, y: 110}, [{ x: 30, y: 30 },{ x: 100, y: 100 }]), PointClassify.Beyond)
	})
})
