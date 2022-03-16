import { Line  } from 'vue-chartjs'

export default {
  extends: Line ,
  props: {
    group: { type: Array },
    category: { type: String }
  },
  mounted() {
    let labels = []
    let data = []

    this.group.forEach(track => {
      labels.push(track.action)
      data.push(track.count)
    })

    this.renderChart({
      labels: labels,
      datasets: [
        {
          label: this.category,
          backgroundColor: '#60b5f5',
          data: data
        }
      ]
    })
  }
}