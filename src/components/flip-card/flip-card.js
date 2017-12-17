Component({
  behaviors: [],
  properties: {
    card: Object
  },
  data:{
    flipped: false
  },
  methods: {
    flipCard (e) {
      this.setData({flipped: !this.data.flipped})
    }
  },
  // lifecycle hooks
  created (){},
  ready (){},
  attached (){},
  moved (){},
  detached (){}
})
