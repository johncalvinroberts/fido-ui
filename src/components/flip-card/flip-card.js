Component({
  behaviors: [],
  properties: {
    card: Object
  },
  data:{
    flipped: false
  },
  methods: {
    flipCard: function (e) {
      this.setData({flipped: !this.data.flipped})
    }
  },
  // lifecycle hooks
  created: function(){},
  ready: function(){},
  attached: function(){
    console.log(this.data)
  },
  moved: function(){},
  detached: function(){}
})
