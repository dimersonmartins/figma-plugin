import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
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
          backgroundColor: [
            '#60b5f5',
            '#ffd966',
            '#8e7cc3',
            '#93c47d',
            '#f6b26b',
            '#e06666',
            '#c27ba0',
            '#132431',
            '#56a2dc',
            '#9fd2f9',
            '#f560b5',
            '#f5a060',
            '#99823d',
            '#d966ff',
            '#66ffd9',
            '#ff8d66',
            '#cc4125',
            '#60b5f5',
            '#ffd966',
            '#8e7cc3',
            '#93c47d',
            '#f6b26b',
            '#e06666',
            '#c27ba0',
            '#132431',
            '#56a2dc',
            '#9fd2f9',
            '#f560b5',
            '#f5a060',
            '#99823d',
            '#d966ff',
            '#66ffd9',
            '#ff8d66',
            '#cc4125'
          ],
          data: data
        }
      ]
    })
  }
}