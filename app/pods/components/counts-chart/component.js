import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  countData: undefined,
  chartOptions: undefined,

  chartData: computed('countData', function() {
    let counts = this.get('countData.counts');
    let values = [];
    let colors = [];

    if (counts) {
      Object.keys(counts).forEach(key => {
        let value = parseInt(key);
        let count = counts[key];

        for(let i=0; i<count; i++) {
          values.push(value);
          colors.push(this._textToColour(value));
        }
      });

      values = values.sort((a, b) => a - b);
    }

    return {
      labels: Array(values.length).fill(''),
      datasets: [{
        data: values,
        backgroundColor: colors,
      }]
    }
  }),

  init() {
    this._super(...arguments);

    this.chartOptions = {
      legend: { display: false },
      tooltips: { enabled: false },
      scales: {
        yAxes: [{
          ticks: { beginAtZero: true, fontSize: 50 },
          gridLines: { display:false }
        }],
        xAxes: [{
          display: true,
          gridLines: { display: false, fontSize: 50 }
        }]
      }
    };
  },

  _textToColour(text) { //TODO: come up with a better color algorithm
    let hashCode = this._hashCode(`${text}a${text}bc${text}xy${text}z`);
    let rgb = this._intToARGB(hashCode);
    return `#${rgb}`;
  },

  _hashCode(str) {
    var hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  },

  _intToARGB(i) {
    var hex = ((i>>24)&0xFF).toString(16) +
            ((i>>16)&0xFF).toString(16) +
            ((i>>8)&0xFF).toString(16) +
            (i&0xFF).toString(16);
    hex += '000000';
    return hex.substring(0, 6);
  },
});
